#1
birthdate = input("Enter your birthdate in the format (DD/MM/YYYY): ")

#2
year = int(birthdate.split("/")[2])

age = 2025 - year

number_candles = age % 10
if number_candles == 0:
    number_candles = 1 
    
candles = "i" * number_candles

"""
print(f"       ____{candles}____")
print("      |:H:a:p:p:y:|")
print("    __|___________|__")
print("   |^^^^^^^^^^^^^^^^^|")
print("   |:B:i:r:t:h:d:a:y:|")
print("   |                 |")
print("   ~~~~~~~~~~~~~~~~~~~")"""

#bonus

leap_year = (year % 4 == 0 and (year % 100 != 0 or year % 400 == 0))

cake = f"""
        ____{candles}____
      |:H:a:p:p:y:|
    __|___________|__
   |^^^^^^^^^^^^^^^^^|
   |:B:i:r:t:h:d:a:y:|
   |                 |
   ~~~~~~~~~~~~~~~~~~~
"""

if leap_year:
    print(cake * 2)  
else:
    print(cake)     
