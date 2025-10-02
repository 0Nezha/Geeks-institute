# Pagination System
import math

# Step 1: Create the Pagination Class
class Pagination :
# Step 2: Implement the __init__ Method
    def __init__(self, items=None, page_size=10):
        self.items = items if items is not None else []
        self.page_size = page_size
        self.current_idx = 0
        self.total_pages = math.ceil(len(self.items)  / self.page_size)
# Step 3: Implement the get_visible_items() Method
    def get_visible_items(self):
        items=self.items[self.current_idx * self.page_size : (self.current_idx + 1) * self.page_size]  
        return items #self.items[start:end]
# Step 4: Implement Navigation Methods
    def go_to_page(self, page_num=1):
        if 1 <= page_num <= self.total_pages:
          self.current_idx = page_num - 1  
        else:
           raise ValueError("Invalid page number")
    def first_page(self):
        return self.go_to_page(1)
    def last_page(self):
        return self.go_to_page(self.total_pages)
    def next_page(self):
        if self.current_idx < self.total_pages - 1:
            return self.go_to_page(self.current_idx + 2) 
        else: None
    def previous_page(self):
        if self.current_idx > 0:
            return self.go_to_page(self.current_idx ) 
# Step 5: Add a Custom __str__() Method
    def __str__(self):
        return "\n".join(str(item) for item in self.get_visible_items())
    
# Step 6: Test Your Code
alphabetList = list("abcdefghijklmnopqrstuvwxyz")
p = Pagination(alphabetList, 4)
print(str(p))

print(p.get_visible_items())
# ['a', 'b', 'c', 'd']

p.next_page()
print(p.get_visible_items())
# ['e', 'f', 'g', 'h']

p.last_page()
print(p.get_visible_items())
# ['y', 'z']

p.go_to_page(10)
print(p.current_idx + 1)
# Output: 7

p.go_to_page(0)
# Raises ValueError


