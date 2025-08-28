from psycopg2 import connect
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

load_dotenv()

def connect_to_db():
    try:
        conn = connect(
            host=os.getenv("PGHOST"),
            database=os.getenv("PGDATABASE"),
            user=os.getenv("PGUSER"),
            password=os.getenv("PGPASSWORD"),
            sslmode=os.getenv("PGSSLMODE", "disable"),
            cursor_factory=RealDictCursor
        )
        return conn
    except Exception as e:
        print("Database connection failed:", e)
        return None
