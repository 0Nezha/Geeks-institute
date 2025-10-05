#Part II
from game import Game

#1
def get_user_menu_choice():
    print("\n--- Rock Paper Scissors Menu ---")
    print("(1) Play a new game")
    print("(2) Show scores")
    print("(x) Quit")

    choice = input("Enter your choice: ").strip().lower()
    if choice in ["1", "2", "x"]:
        return choice
    else:
        print("Invalid choice. Please select 1, 2, or x for quit.")
        return None
#2
def print_results(results):
    print("\n--- Game Summary ---")
    print(f"✅ Wins : {results['win']}")
    print(f"❌ Losses : {results['loss']}")
    print(f"🤝 Draws : {results['draw']}")
    print("\nThank you for playing! 👋")
#3
def main():
    results = {"win": 0, "loss": 0, "draw": 0}

    while True:
        choice = get_user_menu_choice()
        if choice == "1":
            game = Game()
            outcome = game.play()
            results[outcome] += 1

        elif choice == "2":
            print_results(results)

        elif choice == "x":
            print_results(results)
            break
        
if __name__ == "__main__":
    main()
