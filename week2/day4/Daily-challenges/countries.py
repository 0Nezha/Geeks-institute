import requests
import psycopg2
import random


def create_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="countries_db",
        user="postgres",
        password="postgresql"
    )
    return conn

API_URL = "https://restcountries.com/v3.1/all?fields=name,capital,flag,subregion,population"

def fetch_countries_data():
    response = requests.get(API_URL)
    if response.status_code == 200:
        return response.json()
    else:
         print("Error fetching countries.")
    return []
    

def main():
    conn = create_connection()
    cursor = conn.cursor()

    countries_data = fetch_countries_data()
    random_countries = random.sample(countries_data, 10)

    for country in random_countries:
        name = country.get("name", {}).get("common", "Unknown")
        capital = country.get("capital", [None])[0] if country.get("capital") else None
        flag = country.get("flags", {}).get("png", None)
        subregion = country.get("subregion", None)
        population = country.get("population", 0)

        cursor.execute("""
            INSERT INTO countries (name, capital, flag, subregion, population)
            VALUES (%s, %s, %s, %s, %s)
        """, (name, capital, flag, subregion, population))

    conn.commit()
    cursor.close()
    conn.close()
    print("10 random countries inserted successfully.")


if __name__ == "__main__":
    main()    
