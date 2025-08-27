#Part 2:
from menu_item import MenuItem
from menu_manager import MenuManager

#1
def show_user_menu():
    while True:
        print("\n=== Restaurant Menu Manager ===")
        print("V - View an Item")
        print("A - Add an Item")
        print("D - Delete an Item")
        print("U - Update an Item")
        print("S - Show the Menu")
        print("E - Exit")
        choice = input("Choose an option: ").upper()

        if choice == "V":
            view_item()
        elif choice == "A":
            add_item_to_menu()
        elif choice == "D":
            remove_item_from_menu()
        elif choice == "U":
            update_item_from_menu()
        elif choice == "S":
            show_restaurant_menu()
        elif choice == "E":
            show_restaurant_menu()
            print("Exiting.")
            break
        else:
            print("Invalid choice!")
            
def view_item():
    item_name = input("Enter the item name to view: ")
    item = MenuManager.get_by_name(item_name)
    if item:
        print(f"Item found: {item.name} - ${item.price}")
    else:
        print("Item not found.")

#2
def add_item_to_menu():
    item_name = input("Enter the item name to add: ")
    item_price = float(input("Enter the item price: "))
    item = MenuItem(item_name, item_price)
    item.save()
    print("item was added successfully.")

#3
def remove_item_from_menu():
    item_name = input("Enter the item name to delete: ")
    item = MenuManager.get_by_name(item_name)
    if item:
        item.delete()
        print("Item was deleted successfully.")
    else:
        print("Item not found.")
        
#4
def update_item_from_menu():
    item_name = input("Enter the item name to update: ")
    item = MenuManager.get_by_name(item_name)
    if item:
        new_name = input("Enter the new name: ")
        new_price = input("Enter the new price: ")
        item.update(new_name, new_price)
        print("Item was updated successfully.")
    else:
        print("Item not found.")

#5
def show_restaurant_menu():
    items = MenuManager.get_all_items()
    print("\n=== Restaurant Menu ===")
    for item in items:
        print(f"{item.name} - ${item.price}")
    
if __name__ == "__main__":
    show_user_menu()