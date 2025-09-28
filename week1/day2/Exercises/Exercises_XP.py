#Exercise 1: Convert lists into dictionaries

from ast import Add, Call
from random import random


keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]
result = dict(zip(keys, values))
print(result)

#Exercise 2 : Cinemax #2
family = {"rick": 43, 'beth': 13, 'morty': 5, 'summer': 8}
total_cost=0

for name, age in family.items():
        if age < 3:
            price = 0
        elif 3 <= age <= 12:
            price = 10
        else:
            price = 15
        print(f"{name.capitalize()} has to pay: ${price}")

        total_cost += price
print(f"Total cost for the family: ${total_cost}")

#Bonus: Ask the user to input the names and ages instead of using the provided family variable (Hint: ask the user for names and ages and add them into a family dictionary that is initially empty).
family = {}

num_members = int(input("How many family members will you be adding? "))
for i in range(num_members):
    name = input("Enter name of member: ")
    age = int(input(f"Enter age for {name}: "))
    family[name] = age

print("Family dictionary:", family)

#Exercise 3: Zara
#1
brand = {
    'name': 'Zara',
    'creation_date': 1975,
    'creator_name': 'Amancio Ortega Gaona',
    'type_of_clothes': ['men', 'women', 'children', 'home'],
    'international_competitors': ['Gap', 'H&M', 'Benetton'],
    'number_stores': 7000,
    'major_color': {
        'France': 'blue',
        'Spain': 'red',
        'US': ['pink', 'green']
    }
}

#2
brand['number_stores'] = 2

#3
print("Zara's clients are:", ', '.join(brand['type_of_clothes']))

#4
brand['country_creation'] = 'Spain'

#5 
if 'international_competitors' in brand:
    brand['international_competitors'].append('Desigual')
    
#6. 
del brand['creation_date']

#7. 
print("Last international competitor:", brand['international_competitors'][-1])

#8.
print("Major clothes colors in the US:", ', '.join(brand['major_color']['US']))

#9. 
print("Number of key-value pairs:", len(brand))

# 10.
print("Keys of the dictionary:", list(brand.keys()))

# 11. 
more_on_zara = {
    'creation_date': 1975,
    'number_stores': 10000
}

# 12. 
brand.update(more_on_zara)

#13
print("Number of stores:", brand['number_stores'])
# We updated the 'number_stores' key in the brand dictionary with a new value from the more_on_zara dictionary.

#Exercise 4: Some Geography
def describe_city(city, country = "Morocco"):
    print(f"{city} is in {country}.")
describe_city("Reykjavik", "Iceland")
describe_city("Casablanca")

#Exercice 5: Random
import random

user_input = int(input("Enter a number between 1 and 100: "))
def guess_number(user_number):
    if 1 <= user_number <= 100:
        random_number = random.randint(1, 100)
        if user_number == random_number:
            print("Success! The numbers match.")
        else:
            print("Fail! The numbers do not match.")
            print(f"Your number: {user_number}, Random number: {random_number}")
    else:
        print("Please enter a number between 1 and 100.")

guess_number(user_input)

#Exercise 6 : Let’s create some personalized shirts !

def make_shirt(size, text):
    print(f"The size of the shirt is {size} and the text is '{text}'.")

def make_shirt(size="large", text="I love Python"):
    print(f"The size of the shirt is {size} and the text is '{text}'.")

make_shirt()

make_shirt("medium")

make_shirt("small", "Neyran")

#Bonus: 
make_shirt(size="medium", text="I love Python")

#Exercise 7 : Temperature Advice 
# Instructions 
# Create a function called get_random_temp().
    
import random

def get_random_temp():
    return random.randint(-10, 40)

print(get_random_temp())

def main():
    season = input("Enter the season (summer, autumn, winter, spring): ")
    temp = get_random_temp(season)
    print(f"The temperature right now is {temp} degrees Celsius.")
    
    if temp < 0:
        print("Brrr, that’s freezing! Wear some extra layers today.")
    elif 0 <= temp < 16:
        print("Quite chilly! Don’t forget your coat.")
    elif 16 <= temp < 24:
        print("The weather is nice! A light jacket should be fine.")
    elif 24 <= temp < 32:
        print("It's getting warm! Short sleeves are perfect.")
    elif 32 <= temp < 40:
        print("Wow, it's hot! Stay hydrated and wear light clothing.")  

main()

def get_random_temp(season):
    if season == "winter":
        return random.randint(-10, 16)
    elif season == "spring":
        return random.randint(0, 24)
    elif season == "summer":
        return random.randint(16, 40)
    elif season == "autumn":
        return random.randint(0, 32)


#Bonus:
def get_random_temp_float(season):
    if season == "winter":
        return round(random.uniform(-10, 16), 1)
    elif season == "spring":
        return round(random.uniform(0, 24), 1)
    elif season == "summer":
        return round(random.uniform(16, 40), 1)
    elif season == "autumn":
        return round(random.uniform(0, 32), 1)



#Bonus:
def season(month):
    if month in [12, 1, 2]:
        return "winter"
    elif month in [3, 4, 5]:
        return "spring"
    elif month in [6, 7, 8]:
        return "summer"
    elif month in [9, 10, 11]:
        return "autumn"
    else:
        return None


#Exercise 8 : Star Wars Quiz
data = [
    {
        "question": "What is Baby Yoda's real name?",
        "answer": "Grogu"
    },
    {
        "question": "Where did Obi-Wan take Luke after his birth?",
        "answer": "Tatooine"
    },
    {
        "question": "What year did the first Star Wars movie come out?",
        "answer": "1977"
    },
    {
        "question": "Who built C-3PO?",
        "answer": "Anakin Skywalker"
    },
    {
        "question": "Anakin Skywalker grew up to be who?",
        "answer": "Darth Vader"
    },
    {
        "question": "What species is Chewbacca?",
        "answer": "Wookiee"
    }
]

#1.
def ask_questions():
    correct = 0
    incorrect = 0
    wrong_answers = []

    for item in data:
        user_answer = input(item["question"] + " ").strip()
        if user_answer.lower() == item["answer"].lower():
            print("Correct!")
            correct += 1
        else:
            print("Incorrect!")
            incorrect += 1

            wrong_answers.append({
                "question": item["question"],
                "your_answer": user_answer,
                "correct_answer": item["answer"]
            })
    return correct, incorrect, wrong_answers

#2.
def show_results(correct, incorrect, wrong_answers):
    print(f"\nYou got {correct} correct and {incorrect} incorrect.")
    
#3.
    if wrong_answers:
        print("\nHere are the questions you answered incorrectly:")
        for item in wrong_answers:
            print(f"- Question: {item['question']}")
            print(f"  Your answer: {item['your_answer']}")
            print(f"  Correct answer: {item['correct_answer']}\n")

    if incorrect > 3:
        print("You missed more than 3 questions. Would you like to play again? (yes/no)")
        play_again = input().strip().lower()
        if play_again == "yes":
            print("\nLet's try again!\n")
            main()
        else:
            print("Thanks for playing!")

def main():
    correct, incorrect, wrong_answers = ask_questions()
    show_results(correct, incorrect, wrong_answers)

main()