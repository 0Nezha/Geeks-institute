#Exercise 1: Cats
class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age
        
#1
cat1= Cat("tamochotino", 1)
cat2= Cat("Tomlilt", 2)
cat3= Cat("tadriwcht", 8)
#2
def oldest_cat(cats):
   oldest_cat = cats[0]
   for cat in cats:
        if cat.age > oldest_cat.age:
            oldest_cat = cat
   return oldest_cat
#3
cats = [cat1, cat2, cat3]
oldest = oldest_cat(cats)
print(f"The oldest cat is {oldest.name}, and is {oldest.age} years old.")

#Exercise 2 : Dogs
#1
class Dog:
#2
    def __init__(self, name, height):
        self.name = name
        self.height = height
#3
    def bark(self):
        print(f"{self.name} goes woof!")
#4
    def jump(self):
        print(f"{self.name} jumps {self.height *2} cm high!")
#5
davids_dog = Dog("Rex", 50)
#6
print(f" your dog name is {davids_dog.name} and it have a {davids_dog.height} cm height.")
davids_dog.bark()
davids_dog.jump()
#7
sarahs_dog = Dog("Teacup", 20)
#8
print(f" your dog name is {sarahs_dog.name} and it have a {sarahs_dog.height} cm height.")
sarahs_dog.bark()
sarahs_dog.jump()
#9
if sarahs_dog.height < davids_dog.height:
    print(f"{sarahs_dog.name} is smaller than {davids_dog.name}.")
elif sarahs_dog.height > davids_dog.height:
    print(f"{sarahs_dog.name} is taller than {davids_dog.name}.")
else:
    print("Both dogs are the same height.")
    
#Exercise 3 : Who’s the song producer?
#1
class Song :
    def __init__(self, lyrics):
        self.lyrics = lyrics
#2
    def sing_me_a_song (self):
        for line in self.lyrics:
            print(line)
#3
stairway= Song(["There’s a lady who's sure","all that glitters is gold", "and she’s buying a stairway to heaven"])
#4
stairway.sing_me_a_song()

#Exercise 4 : Afternoon at the Zoo
#1
class Zoo:
#2
    def __init__ (self, zoo_name):
        self.zoo_name = zoo_name
        self.animals = []
#3
    def add_animal(self, new_animal):
        if new_animal not in self.animals:
            self.animals.append(new_animal)       
#4
    def get_animals(self):
        return self.animals
#5
    def sell_animal (self, animal_sold):
          if animal_sold  in self.animals:
                self.animals.remove(animal_sold)
          return self.animals
#6
    def sort_animals(self):
        self.animals.sort()
        grouped = {}
        for animal in self.animals:
            first_letter = animal[0].upper()
            if first_letter not in grouped:
                grouped[first_letter] = animal
            else:
                if isinstance(grouped[first_letter], str):
                    grouped[first_letter] = [grouped[first_letter], animal]
                else:
                    grouped[first_letter].append(animal)
        return grouped
#7
    def get_groups(self):
        groups = self.sort_animals()
        for letter, animals in groups.items():
            print(f"Group {letter}: {animals}")
        
        
new_york_zoo= Zoo("New York Zoo")
new_york_zoo.add_animal("Lion")
new_york_zoo.add_animal("Tiger")
new_york_zoo.add_animal("Lemur")
new_york_zoo.sell_animal("Lion")
new_york_zoo.sort_animals()
new_york_zoo.get_animals()

