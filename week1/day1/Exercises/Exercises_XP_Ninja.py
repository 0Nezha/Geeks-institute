#Exercise 1: Outputs

3 <= 3 < 9  #True

3 == 3 == 3  #True

bool(0)  #False

bool(5 == "5")  #False

bool(4 == 4) == bool("4" == "4")  #True
#print(bool(4 == 4) == bool("4" == "4"))

bool(bool(None))  #False

x = (1 == True)  #True
y = (1 == False)  #False
a = True + 4  #5 because True is 1 so 1+4=5
b = False + 10  #10 "0+10"

print("x is", x)
print("y is", y)
print("a:", a)
print("b:", b)

#Exercise 2: Longest word without a specific character
longest_sentence = ""

while True:
    sentence = input("Enter the longest sentence they can without the character “A” (or 0 to quit): ")

    if sentence == "0":
        print(f"Final longest sentence: '{longest_sentence}' (length {len(longest_sentence)})")
        break
    elif "A" not in sentence and len(sentence) > len(longest_sentence):
        longest_sentence = sentence
        print("Congratulations! You've set a new longest sentence.")
    else:
        print("try again.")
        
#Exercise 3: Working on a paragraph

paragraph = "Python is a programming language that lets you work quickly and integrate systems more effectively. It is powerful and easy to learn, making it a great choice for beginners and experienced programmers alike. Python's syntax is clear and readable, which helps developers write clean and maintainable code. With a vast ecosystem of libraries and frameworks, Python can be used for web development, data analysis, artificial intelligence, scientific computing, and more."
print("Analyzing paragraph:")
print(paragraph)

# How many characters it contains
print("Number of characters:", len(paragraph))

# How many sentences it contains.
print("Number of sentences:", paragraph.count(".") + paragraph.count("!") + paragraph.count("?"))

# How many words it contains.
print("Number of words:", len(paragraph.split()))

# How many unique words it contains.
unique_words = set(word.strip('.,!?').lower() 
for word in paragraph.split())
print("Number of unique words:", len(unique_words))

# Bonus 1: 
print("Number of non-whitespace characters:", len(paragraph.replace(" ", "").replace("\n", "")))
# Bonus 2: 
average_words_per_sentence = len(paragraph.split()) / (paragraph.count(".") + paragraph.count("!") + paragraph.count("?"))
print("Average words per sentence:", average_words_per_sentence)
# Bonus 3: 
non_unique_words = len(paragraph.split()) - len(unique_words)
print("Number of non-unique words:", non_unique_words)