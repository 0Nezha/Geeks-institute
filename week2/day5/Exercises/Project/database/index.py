import psycopg2

def connect_to_db():
    try:
        conn = psycopg2.connect(
            host="localhost",
            port="5432",
            database="Restaurant",  
            user="postgres",           
            password="postgresql"            
        )
        return conn
    except Exception as e:
        print("Database connection failed:", e)
        return None
