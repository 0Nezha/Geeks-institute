import psycopg2
#Exercise 1:

#PART 1
#2:
class MenuItem:
    def __init__(self, name, price):
        self.name = name
        self.price = price

#3:
    def save(self):
        conn = psycopg2.connect(
            host="localhost",
            database="Restaurant",
            user="postgres",
            password="postgresql"
        )
        cursor = conn.cursor()
        cursor.execute("INSERT INTO Menu_Items (item_name, item_price) VALUES (%s, %s)", (self.name, self.price))
        conn.commit()
        cursor.close()
        conn.close()

    def delete(self):
        conn = psycopg2.connect(
            host="localhost",
            database="Restaurant",
            user="postgres",
            password="postgresql"
        )
        cursor = conn.cursor()
        cursor.execute("DELETE FROM Menu_Items WHERE item_name = %s", (self.name,))
        conn.commit()
        cursor.close()
        conn.close()

    def update(self, new_name=None, new_price=None):
        conn = psycopg2.connect(
            host="localhost",
            database="Restaurant",
            user="postgres",
            password="postgresql"
        )
        cursor = conn.cursor()

        if new_name:
            self.name = new_name
        if new_price:
            self.price = new_price

        cursor.execute("UPDATE Menu_Items SET item_name = %s, item_price = %s WHERE item_name = %s", (self.name, self.price, self.name))
        conn.commit()
        cursor.close()
        conn.close()


