# Exercise 1 : Authentication database
# PART 1: Authentication CLI - login:
# 1:
users = {
    "Salma": "pass12345",
    "Hiba": "hib34560",
    "Arwa": "neee1238"
}

print(users)
# 2:
# 2-1:
while True:
    user_input = input("Enter a command (type 'exit' to quit): ")

    if user_input.lower() == "exit":
        print("Exiting the program...")
        break
# 2-2-1:
    elif user_input == "login":
        username = input("Username: ")
        password = input("Password: ")

        # Check if username exists and password matches
        if username in users and users[username] == password:
            # 2-2-2:
            logged_in = username  
            print(f"You are now logged in as {logged_in}.")
        else:
            print("Invalid username or password.")

    else:
        print("Unknown command. Try 'login' or 'exit'.")
        
# PART 2 : Authentication CLI - signup:
# 1:
    if username not in users:
        choice = input("User does not exist. Would you like to sign up? (yes/no): ").lower()
        if choice == "yes":
            while True:
                new_username = input("Choose a username: ")
                if new_username in users:
                    print("This username already exists. Try again.")
                else:
                 break
# 2:
                new_password = input("Choose a password: ")
                users[new_username] = new_password
                print(f"User '{new_username}' has been successfully signed up!")
        else:
         print("Signup cancelled.")
         
# PART 3 : Database
import psycopg2
import hashlib #Bonus: Try and encrypt the users password before storing it in the database.
import getpass  # Pour cacher le mot de passe lors de la saisie

def get_connection():
    return psycopg2.connect(
        host="localhost",
        database="auth_db",
        user="your_user",
        password="your_password"
    )
def create_table():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
    CREATE TABLE IF NOT EXISTS users (
        username TEXT PRIMARY KEY,
        password TEXT NOT NULL
    )
    """)
    conn.commit()
    cur.close()
    conn.close()
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()
# password.encode() → convertit le mot de passe en bytes.
# sha256 est un algorithme de hachage sécurisé qui transforme les données en une chaîne de 256 bits (64 caractères hexadécimaux).
# .hexdigest() → convertit le hash en chaine hexadécimale prête à stocker dans la base de données.
def check_login(username, password):
    hashed = hash_password(password)
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE username=%s AND password=%s", (username, hashed))
    user = cur.fetchone()
    cur.close()
    conn.close()
    return user is not None
# Le cursor sert à envoyer des requêtes SQL (SELECT, INSERT, UPDATE, DELETE) à la base.
# Il permet aussi de récupérer les résultats des requêtes.
def signup():
    conn = get_connection()
    cur = conn.cursor()
    
    while True:
        username = input("Enter a username : ")
        cur.execute("SELECT * FROM users WHERE username = %s", (username,))
        if cur.fetchone():
            print(" This username already exists. Try again.")
        else:
            break

    password = input("Enter a password : ")
    hashed = hash_password(password)

    cur.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, hashed))
    conn.commit()
    print(f" Account '{username}' created successfully !")

    cur.close()
    conn.close()

def main():
    create_table()
    logged_in = None

    while True:
        action = input("Type 'login', 'signup' or 'exit': ").strip().lower()

        if action == "exit":
            print("Goodbye!")
            break

        elif action == "login":
            username = input("Username: ").strip()
            password = getpass.getpass("Password: ").strip()
            if check_login(username, password):
                print("You are now logged in!")
                logged_in = username
            else:
                print("User not found or wrong password. You can sign up.")

        elif action == "signup":
            signup()

        else:
            print("Invalid option. Try again.")

if __name__ == "__main__":
    main()