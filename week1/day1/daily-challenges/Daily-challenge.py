#Challenge1
#1.Ask the user for a number and a length.
number = int(input("Enter a number: "))
length = int(input("Enter a length: "))

#2
multiples = []
for i in range(1, length + 1):
    multiples.append(number * i)
print(multiples)

 #Challenge2 
string = input("Enter a string: ")
new_string = ""
for i in range(len(string)):
    if i == 0 or string[i] != string[i - 1]:
        new_string += string[i]
print(new_string)
