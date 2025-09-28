word = input("Entrez un mot : ")

index_dict = {}

for index, letter in enumerate(word):
    if letter in index_dict:
        index_dict[letter].append(index)
    else:
        index_dict[letter] = [index]
print(index_dict)