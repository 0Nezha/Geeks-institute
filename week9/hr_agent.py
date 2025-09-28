import json
import os
import re
from datetime import datetime, timedelta, date
from collections import Counter, defaultdict
import textwrap
from typing import Optional, List
from dotenv import load_dotenv
from openai import OpenAI


load_dotenv()
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")  # Ton Personal Access Token GitHub
MODEL = "gpt-4o-mini"

if not GITHUB_TOKEN:
    print("Please set your GITHUB_TOKEN in environment or .env file.")
    exit(1)

HEADERS = {
    "Authorization": f"Bearer {GITHUB_TOKEN}",
    "Accept": "application/vnd.github+json"
}

MAILJET_API_KEY = os.getenv("MAILJET_API_KEY")
MAILJET_SECRET_KEY = os.getenv("MAILJET_SECRET_KEY")
SENDER_EMAIL = os.getenv("SENDER_EMAIL")

# ---------- Data setup ----------
if not os.path.exists('data'):
    os.makedirs('data')
DATA_DIR = "data"
CANDIDATES_FILE = os.path.join(DATA_DIR, "candidates.json")
JOBS_FILE = os.path.join(DATA_DIR, "jobs.json")
SHORTLISTS_FILE = os.path.join(DATA_DIR, "shortlists.json")


# ---------- Utility functions ----------

def load_candidates():
    with open(CANDIDATES_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)


def load_jobs():
    with open(JOBS_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)


def load_shortlists():
    if not os.path.exists(SHORTLISTS_FILE):
        return {}
    with open(SHORTLISTS_FILE, 'r', encoding='utf-8') as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            data = {}  # si le fichier est vide
    return data


def save_shortlists(data):
    with open(SHORTLISTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# ---------- Required functions ----------

def parse_query(text):
    """Return dict: {role?, skills[], location?, minExp?, maxExp?, availabilityWindowDays?}
    Very small NLU: skills matched from candidate/job skills, location by city names, experience range by pattern.
    """
    text_low = text.lower()
    jobs = load_jobs()
    # Collect known skills from jobs + candidates
    all_skills = set()
    for j in jobs:
        for s in j.get('skillsRequired', []):
            all_skills.add(s.lower())
    for c in load_candidates():
        for s in c.get('skills', []):
            all_skills.add(s.lower())

    skills_found = []
    for skill in sorted(all_skills, key=lambda s: -len(s)):
        if re.search(r'\b' + re.escape(skill) + r's?\b', text_low):
            skills_found.append(skill.title())

    # location: look for "in <City>" or city names
    location = None
    m = re.search(r' in ([A-Za-zÀ-ÖØ-öø-ÿ\- ]+)', text, re.I)
    if m:
        location = m.group(1).strip()
    else:
        # try common cities from candidates
        cities = {c['location'].lower(): c['location'] for c in load_candidates()}
        for city_l, city in cities.items():
            if city_l in text_low:
                location = city
                break

    # experience range
    minExp = None
    maxExp = None
    m = re.search(r'(\d+)\s*[-–]\s*(\d+)\s*years?', text_low)
    if m:
        minExp = float(m.group(1))
        maxExp = float(m.group(2))
    else:
        m = re.search(r'(\d+)\s*years?\s*or less', text_low)
        if m:
            minExp = 0.0
            maxExp = float(m.group(1))
        else:
            m = re.search(r'\b(\d+)\+?\s*years?\b', text_low)
            if m:
                minExp = float(m.group(1))
                maxExp = None

    # availabilityWindowDays: phrases
    availabilityWindowDays = None
    if 'this month' in text_low:
        # days until end of current month
        today = date.today()
        next_month = (today.replace(day=28) + timedelta(days=4)).replace(day=1)
        end_month = next_month - timedelta(days=1)
        availabilityWindowDays = (end_month - today).days
    else:
        m = re.search(r'available within (\d+) days', text_low)
        if m:
            availabilityWindowDays = int(m.group(1))

    # role/title extraction naive: before the word in or for
    role = None
    m = re.search(r'find (?:top \d+ )?([A-Za-z0-9 \-]+?) in ', text, re.I)
    if m:
        role = m.group(1).strip()
    else:
        m = re.search(r'for "([^"]+)"', text)
        if m:
            role = m.group(1)

    return {
        'role': role,
        'skills': skills_found,
        'location': location,
        'minExp': minExp,
        'maxExp': maxExp,
        'availabilityWindowDays': availabilityWindowDays
    }


def score_candidate(candidate, filters, required_skills=None):
    # scoring per spec
    score = 0
    reasons = []
    if required_skills is None:
        required_skills = filters.get('skills', [])

    # +2 per required skill match
    skill_matches = 0
    for s in required_skills:
        if s.lower() in (skill.lower() for skill in candidate.get('skills', [])):
            score += 2
            skill_matches += 1
    if skill_matches:
        reasons.append(f"{skill_matches} skill(s) match (+{skill_matches*2})")

    # +1 if location exact match
    if filters.get('location') and candidate.get('location'):
        if filters['location'].lower() == candidate['location'].lower():
            score += 1
            reasons.append("location exact (+1)")

    # +1 if experience within user range (±1 year ok)
    minE = filters.get('minExp')
    maxE = filters.get('maxExp')
    exp = candidate.get('experienceYears', 0)
    fits = False
    if minE is None and maxE is None:
        fits = False
    else:
        low = minE if minE is not None else 0
        high = maxE if maxE is not None else low + 100
        if (exp >= (low - 1)) and (exp <= (high + 1)):
            score += 1
            fits = True
            reasons.append("experience fits (±1) (+1)")

    # +1 if availabilityDate within next N days
    aw = filters.get('availabilityWindowDays')
    if aw is not None:
        try:
            avail = datetime.strptime(candidate.get('availabilityDate'), '%Y-%m-%d').date()
            today = date.today()
            if 0 <= (avail - today).days <= aw:
                score += 1
                reasons.append(f"available within {aw}d (+1)")
        except Exception:
            pass

    reason = ', '.join(reasons) if reasons else 'no strong matches'
    return score, reason


def search_candidates(filters, top_n=5):
    candidates = load_candidates()
    # If filters.skills empty but role maps to job, use job skills
    skills = filters.get('skills') or []
    if not skills and filters.get('role'):
        # find job by title
        for j in load_jobs():
            if filters['role'].lower() in j['title'].lower():
                skills = j.get('skillsRequired', [])
                break

    scored = []
    for idx, c in enumerate(candidates):
        s, reason = score_candidate(c, filters, required_skills=skills)
        scored.append({'index': idx+1, 'candidate': c, 'score': s, 'reason': reason})

    scored.sort(key=lambda x: (-x['score'], x['index']))
    top = scored[:top_n]
    # Compose one-line reason per spec
    results = []
    for item in top:
        skills_part = f"{'+'.join([sk for sk in (skills if skills else c.get('skills'))])}" if skills or True else ''
        results.append({
            'index': item['index'],
            'candidate': item['candidate'],
            'score': item['score'],
            'reason': f"{item['reason']} → score {item['score']}"
        })
    return results


def save_shortlist(name, candidate_indices):
    shortlists = load_shortlists()
    candidates = load_candidates()
    selected = []
    for i in candidate_indices:
        if 1 <= i <= len(candidates):
            selected.append(candidates[i-1])

    import datetime
    shortlists[name] = {
        "name": name,
        "createdAt": datetime.datetime.now().isoformat(),
        "candidates": selected
    }
    save_shortlists(shortlists)
    return True



# --------------------- Email Draft ---------------------
def draft_email(recipients, job_title, tone="friendly", closing="Best regards,\nRecruiter"):
    if isinstance(recipients, list) and recipients and isinstance(recipients[0], dict):
        emails = [r["email"] for r in recipients]
        names = [r.get("firstName","") for r in recipients]
    else:
        emails = recipients
        names = [None]

    subject = f"Invitation to discuss the {job_title} position"

    if tone == "formal":
        intro = "Dear"
    else:
        intro = "Hello"

    if names:
        intro += " " + ", ".join(names)  # يضيف جميع الأسماء مفصولة بفاصلة

    text = f"""{intro},

I am reaching out to inform you about an opening for the {job_title} position. Based on your profile, we believe you could be an excellent fit for this role.

Would you be available for a brief 15-minute conversation this week to discuss this opportunity further?

{closing}"""

    return {"subject": subject, "text": text, "to": emails}

def html_template(email_obj):
    # simple inline CSS
    subject = email_obj["subject"]
    text = email_obj["text"].replace("\n", "<br>")
    html = f"""<!doctype html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title>{subject}</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height:1.4;">
    <div style="max-width:600px; padding:16px; border:1px solid #ddd; border-radius:8px;">
      <h2 style="margin-top:0;">{subject}</h2>
      <div>{text}</div>
      <p style="margin-top:20px; color:#555;">This is a preview. Reply to proceed.</p>
    </div>
  </body>
</html>"""
    return html
# --------------------- Analytics ---------------------
def analytics_summary():
    candidates = load_candidates()
    countByStage = Counter([c.get('stage','UNKNOWN') for c in candidates])
    skills = Counter()
    for c in candidates:
        for s in c.get('skills', []):
            skills[s] += 1
    top3 = skills.most_common(3)
    return {'countByStage': dict(countByStage), 'topSkills': top3}

# ---------- Simple intent classifier & router ----------

def classify_intent(text):
    t = text.lower()
    if t.startswith('find') or 'find' in t or 'search' in t:
        return 'search'
    if t.startswith('save') or t.startswith('add') or t.startswith('save #'):
        return 'save'
    if t.startswith('draft') or t.startswith('email') or 'draft an outreach' in t:
        return 'draft'
    if t.startswith('show analytics') or t == 'show analytics' or 'analytics' in t:
        return 'analytics'
    if t.startswith('change') or t.startswith('edit'):
        return 'edit'
    if t.startswith('exit') or t=='quit':
        return 'exit'
    return 'unknown'

# ---------- CLI ----------

def pretty_candidate_line(idx, c, score, reason):
    name = f"{c['firstName']} {c['lastName']}"
    skills = ','.join(c.get('skills',[]))
    return f"#{idx} {name} — {c['location']}, {c['experienceYears']}y — skills: {skills} — score {score} — {reason}"


def main_loop():
    print("HR Agent CLI — type 'exit' to quit. Try the seed prompts listed in the README top of this file.")
    last_search_results = []
    while True:
        cmd = input('\n> ').strip()
        if not cmd:
            continue
        intent = classify_intent(cmd)
        if intent == 'exit':
            print('Bye')
            break

        if intent == 'search':
            filters = parse_query(cmd)
            top_n = 5
            m = re.search(r'find\s+top\s+(\d+)', cmd, re.I)
            if m:
                top_n = int(m.group(1))
            results = search_candidates(filters, top_n=top_n)
            last_search_results = results
            print(f"Found {len(results)} candidate(s):")
            for r in results:
                print(pretty_candidate_line(r['index'], r['candidate'], r['score'], r['reason']))

        elif intent == 'save':
            m = re.search(r'save\s+(#?[\d\s,#]+)\s+as\s+\"?([^\"]+)\"?', cmd, re.I)
            if not m:
                m = re.search(r'save\s+([#\d\s,]+)\s+as\s+([^\n]+)', cmd, re.I)
            if m:
                nums = [int(n) for n in re.findall(r'(\d+)', m.group(1))]
                name = m.group(2).strip().strip('"')
                ok = save_shortlist(name, nums)
                if ok:
                    print(f"Saved shortlist '{name}' with indices {nums}")
                else:
                    print("Could not save shortlist")
            else:
                print("Could not parse save command. Use: Save #1 #3 as \"NAME\"")

        elif intent == 'draft':
            m = re.search(r'for\s+\"([^\"]+)\"\s+using\s+job\s+\"([^\"]+)\"(.*)', cmd)
            if not m:
                m = re.search(r'for\s+(\S+)\s+using\s+job\s+\"([^\"]+)\"(.*)', cmd)
            if m:
                shortlist_name = m.group(1)
                job_name = m.group(2)
                tail = m.group(3) if len(m.groups()) >= 3 else ''
                tone = 'friendly'
                if 'formal' in tail.lower():
                    tone = 'formal'
                shortlists = load_shortlists()
                if shortlist_name not in shortlists:
                    print(f"Shortlist '{shortlist_name}' not found. Available: {list(shortlists.keys())}")
                    continue
                indices = shortlists[shortlist_name]
                recipients = shortlists[shortlist_name]['candidates']

                email_data = draft_email(recipients, job_name, tone=tone)
                html = html_template(email_data)

                print('\nSubject: ' + email_data['subject'])
                print('\nPlain text:\n' + email_data['text'])
                print('\nHTML preview (string printed):\n')
                print(html)

                edit = input('\nEdit subject or closing? (y/n) ').strip().lower()
                if edit == 'y':
                    new_subject = input('New subject (leave empty to keep): ').strip()
                    if new_subject:
                        email_data['subject'] = new_subject
                    new_closing = input('New closing line (leave empty to keep): ').strip()
                    if new_closing:
                        email_data['text'] = re.sub(r'(Best regards,\nRecruiter)$', new_closing, email_data['text'])
                    html = html_template(email_data)
                    print('\nUpdated Subject: ' + email_data['subject'])
                    print('\nUpdated HTML preview:\n')
                    print(html)
                else:
                    print('No edits made.')
            else:
                print("Couldn't parse draft command. Example: Draft an outreach email for \"FE-Intern-A\" using job \"Frontend Intern\"")

        elif intent == 'analytics':
            a = analytics_summary()
            print('\nPipeline by stage:')
            for k,v in a['countByStage'].items():
                print(f"  {k} = {v}")
            print('\nTop skills:')
            for s,cnt in a['topSkills']:
                print(f"  {s}({cnt})")

        elif intent == 'edit':
            m = re.search(r'change the subject to \"([^\"]+)\"', cmd, re.I)
            if m:
                print("To change subject, please run the Draft command again and you'll be prompted to edit the subject.")
            else:
                print("Edit not recognized. You can change subject during the Draft flow after preview.")

        else:
            print("I didn't understand. Commands: Find..., Save..., Draft..., Show analytics, Exit")

if __name__ == '__main__':
    main_loop()
