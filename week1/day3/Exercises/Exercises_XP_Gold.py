from manager import MenuManager
#Exercise 1 : Geometry
#1
class Circle :
    def __init__(self, radius=1.0):
        self.radius=radius
#2
    def perimeter(self):
        return 2 * 3.14 * self.radius
    def area(self):
        return 3.14 *(self.radius **2)
#3
    def definition(self):
        return f"Circle with radius: {self.radius} and perimeter is :{self.perimeter()} and area is :{self.area()}"

#Exercise 2 : Custom List Class
import random
#1
class MyList :
    def __init__(self,letters):
        self.letters = letters
#2
    def reversed_list(self):
         return list(reversed(self.letters))
#3
    def sorted_list(self):
        return sorted(self.letters)
#4
    def create_list(self):
        res=[random.randint(1,100) for letter in range(len(self.letters))  ]
        return res
list=MyList(['a','b','c'])
print(list.reversed_list())
print(list.sorted_list())
print(list.create_list())

#Exercise 3 : Restaurant Menu Manager
# file manager.py
menu_manager = MenuManager()

print(menu_manager.add_item("Pizza", 18, "A", True))
print(menu_manager.update_item("Pizza", 14, "A", True))
print(menu_manager.remove_item("Pizza"))

