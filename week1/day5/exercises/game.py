#Part I
import random
class Game:
    def __init__(self):
        self.items = ["rock", "paper", "scissors"]

#1
    def get_user_item(self):
        while True:
            user_input = input("Select (rock, paper, scissors): ").lower()
            if user_input in self.items:
                return user_input
            else:
                print(" Invalid choice. Please select rock, paper, or scissors.")
#2
    def get_computer_item(self):
        """Select rock/paper/scissors at random for the computer."""
        return random.choice(self.items)
#3
    def get_game_result(self, user_item, computer_item):
        if user_item == computer_item:
            return "draw"
        elif (user_item == "rock" and computer_item == "scissors") or \
             (user_item == "paper" and computer_item == "rock") or \
             (user_item == "scissors" and computer_item == "paper"):
            return "win"
        else:
            return "loss"
#4
    def play(self):
        user_item = self.get_user_item()
        computer_item = self.get_computer_item()
        result = self.get_game_result(user_item, computer_item)

        if result == "win":
            print(f"You selected {user_item}. The computer selected {computer_item}. You win!")
        elif result == "loss":
            print(f"You selected {user_item}. The computer selected {computer_item}. You lose.")
        else:
            print(f"You selected {user_item}. The computer selected {computer_item}. It's a draw.")

        return result