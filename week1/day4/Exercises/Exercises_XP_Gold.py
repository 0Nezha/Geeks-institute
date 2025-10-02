# Exercise 1: Bank Account
# Part I:
# 1:
class BankAccount :
    def __init__(self, balance=0):
        self.balance = balance
        
    def deposit(self,number):
        if number > 0:
            try:
                self.balance += number
                return f"Deposit successful. New balance: {self.balance}"
            except Exception as e:
                return f"Error occurred: {e}"
        return "Deposit amount must be positive!"
    
    def withdraw(self, number):
        if number > 0:
            try:
                if number > self.balance:
                    return "Insufficient funds!"
                self.balance -= number
                return f"Withdrawal successful. New balance: {self.balance}"
            except Exception as e:
                return f"Error occurred: {e}"
        return "Invalid withdrawal amount must be positive!"
    
# Part II : Minimum balance account
# 1:
class MinimumBalanceAccount(BankAccount):
# 2:
    def __init__(self, balance=0, minimum_balance=0):
        super().__init__(balance)
        self.minimum_balance = minimum_balance
# 3:
    def withdraw(self, number):
        if number > 0:
            try:
                if self.balance - number < self.minimum_balance:
                    return "Withdrawal denied. Minimum balance would be exceeded!"
                return super().withdraw(number)
            except Exception as e:
                return f"Error occurred: {e}"
        return "Invalid withdrawal amount! The number must be positive."

# Part III: Expand the bank account class
# 1:
class BankAccount :

    def __init__(self, username, password, authenticated=False,balance=0):
        self.balance = balance
        self.username = username
        self.password = password
        self.authenticated = authenticated
# 2:    
    def authenticate(self, username, password):
        if self.username == username and self.password == password:
            self.authenticated = True
            return "Authentication successful."
        return "Authentication failed."
# 3:    
    def withdraw(self, number):
        if not self.authenticated:
            raise Exception("Authentication required.")

        if number > 0:
            try:
                self.balance -= number
                return f"Withdrawal successful. New balance: {self.balance}"
            except Exception as e:
                return f"Error occurred: {e}"
        return "Invalid withdrawal amount number must be positive!"
    def deposit(self, number):
        if not self.authenticated:
           raise Exception("Authentication required.")

        if number > 0:
            try:
                self.balance += number
                return f"Deposit successful. New balance: {self.balance}"
            except Exception as e:
                return f"Error occurred: {e}"
        return "Invalid deposit amount number must be positive!"

# Part IV: BONUS Create an ATM class    
class ATM:
# 1 __init__:
  # 1:
    def __init__(self, account_list, try_limit, current_tries=0):
  # 2:
        if not all(isinstance(acc, (BankAccount, MinimumBalanceAccount)) for acc in account_list):
         raise Exception("All accounts must be BankAccount or MinimumBalanceAccount instances")
        self.account_list = account_list
# 3:
        if try_limit <= 0:
            print("Invalid try_limit. Using default value 2.")
            self.try_limit = 2
        else:
            self.try_limit = try_limit
  # 4:
        self.current_tries = current_tries
  # 5:       
    # def show_main_menu()
# 1 Methods:
  # 1. show_main_menu
    def show_main_menu(self):
        while True:
            print("\n=== ATM Main Menu ===")
            print("1. Log in")
            print("2. Exit")

            choice = input("Select an option: ")

            if choice == "1":
                username = input("Username: ")
                password = input("Password: ")
                self.log_in(username, password)
            elif choice == "2":
                print("Thank you for using the ATM. Goodbye!")
                break
            else:
                print("Invalid option. Please try again.")
  # 2. log_in:
    def log_in(self, username, password):
        for account in self.account_list:
            if account.username == username:
                auth_result = account.authenticate(username, password)
                if account.authenticated:
                    print(f"Welcome {username}!")
                    self.show_account_menu(account)
                    return
                else:
                    self.current_tries += 1
                    print(f"{auth_result} (Try {self.current_tries}/{self.try_limit})")
                    if self.current_tries >= self.try_limit:
                        print("Too many failed attempts. Exiting ATM.")
                        exit()
                    return

        print("No account found with that username.")
  # 3. show_account_menu
    def show_account_menu(self, account):
            while True:
                print("\n--- Account Menu ---")
                print("1. Deposit")
                print("2. Withdraw")
                print("3. Exit")
                choice = input("Enter choice: ")

                if choice == "1":
                    amount = float(input("Amount to deposit: "))
                    account.deposit(amount)
                elif choice == "2":
                    amount = float(input("Amount to withdraw: "))
                    account.withdraw(amount)
                elif choice == "3":
                    break
                else:
                    print("Invalid choice.")
acc1 = BankAccount("Nezha", "password1", 200)
acc2 = BankAccount("Racha", "password2", 300)
atm = ATM([acc1, acc2], try_limit=3)