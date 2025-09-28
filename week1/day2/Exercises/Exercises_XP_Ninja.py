#Exercise 1: Cars
string="Volkswagen, Toyota, Ford Motor, Honda, Chevrolet"
list=string.split(',')
length=sorted(list,reverse=True)
print(list)
count_o=0
count_i=0

for i in list:
   
        count_o+=i.lower().count('o')

   
        count_i+=i.lower().count('i')
print(f"count of o is {count_o},count of i is {count_i}")
# Bonus
list2=["Honda", "Volkswagen", "Toyota", "Ford Motor", "Honda", "Chevrolet", "Toyota"]
set=set(list2)
list2=set
print (list2)

#Exercise 2: What’s your name?
def get_full_name(first_name, last_name, middle_name=""):
   
    first_name = first_name.capitalize()
    last_name = last_name.capitalize()
    middle_name = middle_name.capitalize()

  
    if middle_name:
        return f"{first_name} {middle_name} {last_name}"
    else:
        return f"{first_name} {last_name}"



print(get_full_name(first_name="john", middle_name="hooker", last_name="lee"))
print(get_full_name(first_name="bruce", last_name="lee"))

#Exercise 3: From English to Morse
MORSE_CODE = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..',
    'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
    'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
    'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----',
    '2': '..---', '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..', '9': '----.'
}
def english_to_morse(text):
    text = text.upper()
    morse_list = [MORSE_CODE.get(char, '') for char in text if char != ' ']
    return ' '.join(morse_list).replace('  ', ' / ')

def morse_to_english(morse_code):
    morse_to_char = {value: key for key, value in MORSE_CODE.items()}
    words = morse_code.split(" / ")
    decoded_words = []
    for word in words:
        letters = word.split()
        decoded_letters = [morse_to_char.get(letter, '') for letter in letters]
        decoded_words.append("".join(decoded_letters))
    return " ".join(decoded_words)
