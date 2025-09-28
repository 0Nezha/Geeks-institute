import psycopg2
from menu_item import MenuItem

#4:
class MenuManager:
    @classmethod
    def get_by_name(cls, name):
        conn = psycopg2.connect(
            host="localhost",
            database="Restaurant",
            user="postgres",
            password="postgresql"
        )
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Menu_Items WHERE item_name = %s", (name,))
        result = cursor.fetchone()
        cursor.close()
        conn.close()
        if result:
            return MenuItem(result[0], result[1])
        return None
 
    @classmethod
    def all_items(cls):
        conn = psycopg2.connect(
            host="localhost",
            database="Restaurant",
            user="postgres",
            password="postgresql"
        )
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Menu_Items")
        results = cursor.fetchall()
        cursor.close()
        conn.close()
        return [MenuItem(name, price) for (name, price) in results]
    
    