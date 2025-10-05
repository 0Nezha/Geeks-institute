import math

class Circle:
    def __init__(self, radius=None, diameter=None):
        if radius is not None:
            self.radius = radius
        elif diameter is not None:
            self.radius = diameter / 2
        else:
            raise ValueError("You must specify either radius or diameter.")

    # Propriété radius
    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value <= 0:
            raise ValueError("Radius must be positive.")
        self._radius = value

    # Propriété diameter
    @property
    def diameter(self):
        return self._radius * 2

    @diameter.setter
    def diameter(self, value):
        if value <= 0:
            raise ValueError("Diameter must be positive.")
        self._radius = value / 2

    # area
    def area(self):
        return math.pi * (self._radius ** 2)

    # __str__
    def __str__(self):
        return f"Circle(radius={self.radius}, diameter={self.diameter}, area={self.area():.2f})"

    #  Addition de deux cercles
    def __add__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return Circle(radius=self.radius + other.radius)

    # Comparaison de taille (>, <, >=, <=)
    def __lt__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return self.radius < other.radius

    def __le__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return self.radius <= other.radius

    def __gt__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return self.radius > other.radius

    def __ge__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return self.radius >= other.radius

    # Égalité
    def __eq__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return self.radius == other.radius

    def __ne__(self, other):
        return not self == other


# Exemple 
if __name__ == "__main__":
    c1 = Circle(radius=5)
    c2 = Circle(diameter=10)
    c3 = Circle(radius=20)

    print(c1)  # Circle(radius=5, diameter=10, area=78.54)
    print(c2) 
    print(c3)  

    # Addition
    c4 = c1 + c3
    print(c4)  

    # Comparaisons
    print(c1 == c2)  # True
    print(c1 > c3)   # True
    print(c3 < c1)   # False

    # Sorting circles
    circles = [c1, c2, c3, c4]
    circles.sort() 
    print("🔸 Sorted circles:")
    for c in circles:
        print(c)
