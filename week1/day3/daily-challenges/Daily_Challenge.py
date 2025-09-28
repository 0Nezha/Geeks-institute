#Daily challenge: Old MacDonald’s Farm

#Step 1: Create the Farm Class
class Farm:
#Step 2: Implement the __init__ Method
    def __init__(self, farm_name):
        self.name = farm_name
        self.animals = {}
#Step 3: Implement the add_animal Method
    def add_animal(self, animal_type, count=1):
        if animal_type in self.animals:
            self.animals[animal_type] += count
        else:
            self.animals[animal_type] = count
#Step 4: Implement the get_info Method
    def get_info(self):
        result = f"{self.name}'s farm : \n"
        for animal, count in self.animals.items():
            result += f"{animal} : {count}\n"
        result += "E-I-E-I-O!"
        return result
#Step 6: Implement the get_animal_types Method
    def get_animal_types(self):
        return sorted(list(self.animals.keys()))
#Step 7: Implement the get_short_info Method
    def get_short_info(self):
        animal_list = []
        for animal in self.get_animal_types():
            if self.animals[animal] > 1:
                animal_list.append(animal + "s")
            else:
                animal_list.append(animal)
                    
        if animal_list:
          if len(animal_list) == 1:
             animals_str = animal_list[0]
          else:
             animals_str = ", ".join(animal_list[:-1]) + " and " + animal_list[-1]
          text = f"{self.name} farm has {animals_str}."
        else:
          text = f"{self.name} farm has no animals with more than one count."
        return text
    
#Step 5: Test Your Code

# Test the code 
macdonald = Farm("McDonald")
macdonald.add_animal('cow', 5)
macdonald.add_animal('sheep')
macdonald.add_animal('sheep')
macdonald.add_animal('goat', 12)


print(macdonald.get_info())
print(macdonald.get_animal_types())
print(macdonald.get_short_info())