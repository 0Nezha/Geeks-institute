# HR Agent

A simple chat-only assistant for recruiters to search candidates, save shortlists, draft outreach emails, and view tiny analytics.
This version uses GitHub Models (gpt-4o-mini) for email drafting.

## Project Structure

.
├─ hr_agent.py          # Main Python script
├─ data/
│   ├─ candidates.json  # Candidate data (≥12 items)
│   ├─ jobs.json        # Job data (2–3 items)
│   └─ shortlists.json  # Generated shortlists (empty {} at start)
├─ README.md            # This file

## Setup

1. Clone the repo and create `data/` folder with:
   - `candidates.json` (≥12 entries)
   - `jobs.json` (2–3 entries)
   - `shortlists.json` (start empty: `{}`)

2. Create a `.env` file and add your GitHub token:
GITHUB_TOKEN=your_personal_access_token_here

Use a GitHub Personal Access Token with repo and workflow scopes.

Install required packages:

3. pip install requests python-dotenv

🏃 How to Run
python hr_agent.py


You will enter an interactive CLI. Type commands as described below.

💬 Seed Prompts / Example Commands
1. Search candidates
Find top 5 React interns in Casablanca, 0–2 years, available this month

2. Save a shortlist
Save #1 #3 #5 as "FE-Intern-A"

3. Draft an outreach email
Draft outreach email for "FE-Intern-A" using job "Frontend Intern"


After preview, you'll be prompted to edit the subject or closing line.

4. Change subject after draft

After the draft preview:

Edit subject or closing? (y/n)


Type y → Enter new subject:

New subject: Quick chat about a Frontend Intern role?

5. Show analytics
Show analytics


Sample output:

Pipeline by stage:
  SOURCED = 7
  SCREEN = 3
  INTERVIEW = 2

Top skills:
  React(8)
  Python(6)
  SQL(5)



2. Install deps:
```bash
pip install openai   #hadi ila bghit nakhdam b openai  


