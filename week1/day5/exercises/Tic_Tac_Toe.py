# Tic Tac Toe

def display_board(board):
    print("\n")
    for row in range(3):
        print(" | ".join(board[row*3:(row+1)*3]))
        if row < 2:
            print("---------")
    print("\n")


def player_input(board, player):
    while True:
        try:
            pos = int(input(f"Player {player}, choose a position (1-9): "))
            if pos < 1 or pos > 9:
                print("Invalid position. Choose between 1 and 9.")
            elif board[pos - 1] != " ":
                print("That spot is already taken. Choose another.")
            else:
                board[pos - 1] = "X" if player == 1 else "O"
                break
        except ValueError:
            print("Please enter a valid number between 1 and 9.")


def check_win(board, symbol):
    winning_combinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  # lignes
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  # colonnes
        [0, 4, 8], [2, 4, 6]              # diagonales
    ]

    for combo in winning_combinations:
            if all(board[i]  == symbol  for i in combo):
                return True
    return False


def play():
    print("🎮 Welcome to Tic Tac Toe!")
    print("Player 1 = X | Player 2 = O")
    board = [" " for _ in range(9)]
    display_board(board)

    current_player = 1  # commence avec joueur 1

    while True:
        player_input(board, current_player)
        display_board(board)

        symbol = "X" if current_player == 1 else "O"
        if check_win(board, symbol):
            print(f"🎉Player {current_player} ({symbol}) wins!")
            break

        if " " not in board:  
            print("🤝 It's a tie!")
            break

        current_player = 2 if current_player == 1 else 1


if __name__ == "__main__":
    play()
