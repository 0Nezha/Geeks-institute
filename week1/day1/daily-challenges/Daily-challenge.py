#Challenge1
#Ask the user for a number and a length.
number = int(input("Enter a number: "))
length = int(input("Enter a length: "))

#Create a program that prints a list of multiples of the number until the list length reaches length.
multiples = []
for i in range(1, length + 1):
    multiples.append(number * i)
print(multiples)

 #Challenge2
 #Write a program that asks a string to the user, and display a new string with any duplicate consecutive letters removed.
string = input("Enter a string: ")
new_string = ""
for i in range(len(string)):
    if i == 0 or string[i] != string[i - 1]:
        new_string += string[i]
print(new_string)