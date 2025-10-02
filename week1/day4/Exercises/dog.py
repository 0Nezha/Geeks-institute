import random

class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight
# 2:
    def bark(self):
        return f"{self.name} is barking"

    def run_speed(self):
        return (self.weight / self.age) * 10

    def fight(self, other_dog):
        self_power = self.run_speed() * self.weight
        other_power = other_dog.run_speed() * other_dog.weight

        if self_power > other_power:
            return f"{self.name} won the fight against {other_dog.name}"
        elif self_power < other_power:
            return f"{other_dog.name} won the fight against {self.name}"
        else:
            return f"{self.name} and {other_dog.name} fought to a tie"
        
# 2:
class PetDog(Dog):
# 3:
    def __init__(self, name, age, weight):
        super().__init__(name, age, weight)
        self.trained = False   
# 4:
    def train(self):
        print(self.bark())
        self.trained = True

    def play(self, *dog_names):
        names = ", ".join(dog_names)
        print(f"{names} all play together")

    def do_a_trick(self):
        if self.trained:
            tricks = [
                f"{self.name} does a barrel roll",
                f"{self.name} stands on his back legs",
                f"{self.name} shakes your hand",
                f"{self.name} plays dead"
            ]
            print(random.choice(tricks))
        else:
            print(f"{self.name} is not trained yet!")
