#Exercise 1: Birthday Look-up & Exercise 2: Birthdays Advanced
import random 
birthdays={"Nezha":"2004/07/18",
           "Ismail":"2007/04/03",
           "Saida":"2001/06/10",
           "Sara":"2004/10/06",
           "Racha":"1993/12/08"}
print("You can look up the birthdays of the people in the list!")
print(birthdays.keys())
persons_name =input("enter your name : ")
if persons_name not in birthdays.keys():
    print("Sorry, we don’t have the birthday information for person's name")
else :
    print(f"your birthday is {birthdays[persons_name]}")


#Exercise 3: Sum
user_number = int(input('Enter a number: '))
X_str = str(user_number)
total = int(X_str) + int(X_str*2) + int(X_str*3) + int(X_str*4)
print("sum:", total)


#Exercise 4: Double Dice
import random
def throw_dice():
    return random.randint(1, 6)
def throw_until_doubles():
    count = 0
    while True:
        count += 1
        dice1 = throw_dice()
        dice2 = throw_dice()
        if dice1 == dice2:
            return count
def main():
    results = [] 
    for _ in range(100):
        throws = throw_until_doubles()
        results.append(throws)
    total_throws = sum(results)
    average_throws = total_throws / len(results)
    print(f"Nombre total de lancers pour obtenir 100 doubles : {total_throws}")
    print(f"Moyenne de lancers pour obtenir un double : {average_throws:.2f}")
if __name__ == "__main__":
    main()