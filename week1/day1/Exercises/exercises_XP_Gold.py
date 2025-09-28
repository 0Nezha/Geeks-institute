#exercise1: Season
#1
month = int(input("Enter a month (1-12): "))
#2
if 3 <= month <= 5:
    print("Spring season")
elif 6 <= month <= 8:
    print("Summer season")
elif 9 <= month <= 11:
    print("Autumn season")
else:
    print("Winter season")
    
#Exercise 2: For Loop
#1
for number in range(1, 21):
    print(number)
    
#2
print("element with even index:")
numbers = list(range(1, 21))
for i in range(len(numbers)):   
    if i % 2 == 0:              
        print(numbers[i])

#Exercise 3: While Loop
name = "Nezha"
while True:
    user_name = input("Enter your name:")
    if user_name == name:
        print("Welcome,", name)
        break
    else:
        print("Access denied, try again.")
        
#Exercise 4: Check the index
names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']
user_name = input("Enter your name:")
if user_name in names:
    print("The index of", user_name, "is", names.index(user_name))
else:
    print("Name not found.")
    
#Exercise 5: Greatest Number
number1 = int(input("Input the 1st number: "))
number2 = int(input("Input the 2nd number: "))
number3 = int(input("Input the 3rd number: "))
print("The greatest number is:", max(number1, number2, number3))

#Exercise 6: Random number
import random
won = 0
lost = 0

while True:
    user_number = int(input("Enter a number between 1 and 9 (or 0 to quit): "))
    
    if user_number == 0:
        break
    
    random_num = random.randint(1, 9)
    
    if user_number == random_num:
        print("Winner!")
        won += 1
    else:
        print("Better luck next time.")
        lost += 1
           
print("Total games won:", won)
print("Total games lost:", lost)