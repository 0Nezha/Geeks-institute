#exercice1:
for i in range(4):
    print("Hello World")
    
#exercice2:
result = (99 ** 3) * 8
print(result)

#exercice3:
user_name = input("What's your name? ")
if user_name == "Nezha":
    print("Hi Nezha! We have the same name!")
else:
    print("Nice to meet you. I'm happy to see you " + user_name + "!")
    
#exercice4:    

user_height = int(input("What's your height in centimeters?"))
if user_height >= 145:
    print("You are tall enough! Enjoy the ride!")
else:
    print("You are not tall enough to ride.")
    
#exercice5:
my_fav_numbers = {7, 18, 1, 4, 50}
my_fav_numbers.add(90)
my_fav_numbers.add(78)
my_fav_numbers.remove(4)
print("My favorite numbers are:", my_fav_numbers)
friend_fav_numbers = {3, 68, 8, 5, 49}
print("My friend's favorite numbers are:", friend_fav_numbers)
our_fav_numbers = (my_fav_numbers).union(friend_fav_numbers)
print("Our favorite numbers are:", our_fav_numbers)

#exercice6:
#Given a tuple which value is integers, is it possible to add more integers to the tuple?
#No, tuples are immutable in Python. Once a tuple is created, cannot add or remove elements from it.

#exercice7:
basket = ["Banana", "Apples", "Oranges", "Blueberries"]
basket.remove("Banana")
basket.remove("Blueberries")
basket.append("Kiwi")
basket.insert(0, "Apples")
print(basket)
print("Number of Apples:", basket.count("Apples"))
basket.clear()
print(basket)

#exercice8:
sandwich_orders = [
    "Tuna sandwich",
    "Pastrami sandwich",
    "Avocado sandwich",
    "Pastrami sandwich",
    "Egg sandwich",
    "Chicken sandwich",
    "Pastrami sandwich"
]

# 1. Remove all occurrences of "Pastrami sandwich"
while "Pastrami sandwich" in sandwich_orders:
    sandwich_orders.remove("Pastrami sandwich")
# 2. We need to prepare the orders of the clients:
print("We need to prepare the following sandwiches:")
for sandwich in sandwich_orders:
    print(f"- {sandwich}")

# 3. Create an empty list for finished sandwiches
finished_sandwiches = []

#4. One by one, remove each sandwich from the sandwich_orders while adding them to the finished_sandwiches list.
while sandwich_orders:
    current_sandwich = sandwich_orders.pop(0)  # remove first sandwich
    finished_sandwiches.append(current_sandwich)  
    print(f"I made your {current_sandwich.lower()}")  # print message



