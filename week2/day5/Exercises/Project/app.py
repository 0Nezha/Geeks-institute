from flask import Flask, render_template, request, redirect, url_for, flash
from database.index import connect_to_db
import os
from dotenv import load_dotenv
from psycopg2.extras import RealDictCursor
from datetime import datetime
from werkzeug.utils import secure_filename

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", "default_secret_key")

# Config upload
UPLOAD_FOLDER = "static/uploads"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS





# Page d'accueil avec pagination
@app.route('/')
def index():
    page = request.args.get('page', 1, type=int)
    per_page = 6
    offset = (page - 1) * per_page

    conn = connect_to_db()
    if not conn:
        flash("Database connection error", "danger")
        return render_template('index.html', 
                               menu=[], page=page, total_pages=1,
                               year=datetime.now().year)

    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT COUNT(*) as total FROM menu_items")
    total_menu_items = cursor.fetchone()['total']
    total_pages = (total_menu_items + per_page - 1) // per_page

    cursor.execute("""
        SELECT *
        FROM menu_items
        ORDER BY item_id DESC
        LIMIT %s OFFSET %s
    """, (per_page, offset))
    menu_items = cursor.fetchall()
    conn.close()

    return render_template('index.html',
                           menu=menu_items,
                           page=page,
                           total_pages=total_pages,
                           year=datetime.now().year)

# Détail d'un plat
@app.route('/menu/<int:id>')
def menu_detail(id):
    conn = connect_to_db()
    if not conn:
        return render_template('menu_detail.html', menu_item=None)

    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM menu_items WHERE item_id = %s", (id,))
    menu_item = cursor.fetchone()
    conn.close()

    if not menu_item:
        flash("Menu item not found", "danger")
        return redirect(url_for('index'))

    return render_template('menu_detail.html', menu_item=menu_item)

# Ajouter un plat
@app.route('/add', methods=['GET', 'POST'])
def add_item():
    if request.method == 'POST':
        name = request.form['name']
        description = request.form.get('description', '')
        category = request.form.get('category', '')
        rating = request.form.get('rating', None)
        price = request.form['price']

        if not name or not price or not category:
            flash("Name, Price and Category are required", "warning")
            return redirect(url_for('add_item'))

        # Gestion de l'image
        image_url = None
        image_file = request.files.get("image")
        if image_file and allowed_file(image_file.filename):
            filename = secure_filename(image_file.filename)
            filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)  
            image_file.save(filepath)
            image_url = f"/static/uploads/{filename}"

        conn = connect_to_db()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO menu_items (name, description, category, rating, price, image_url)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (name, description, category, rating, int(price), image_url))
        conn.commit()
        conn.close()

        flash("Dish added successfully", "success")
        return redirect(url_for('index'))

    return render_template('add_item.html', year=datetime.now().year)

# Supprimer un plat
@app.route('/delete/<int:item_id>', methods=['POST'])
def delete_item(item_id):
    conn = connect_to_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM menu_items WHERE item_id = %s", (item_id,))
    conn.commit()
    conn.close()

    flash("Dish deleted successfully", "success")
    return redirect(url_for('index'))

# Mettre à jour un plat
@app.route('/update/<int:item_id>', methods=['GET', 'POST'])
def update_item(item_id):
    conn = connect_to_db()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    if request.method == 'POST':
        name = request.form['name']
        description = request.form.get('description', '')
        category = request.form.get('category', '')
        rating = request.form.get('rating', None)
        price = request.form['price']

        # Récupérer l'ancienne image
        cursor.execute("SELECT image_url FROM menu_items WHERE item_id=%s", (item_id,))
        row = cursor.fetchone()
        image_url = row['image_url'] if row else None

        # Gestion nouvelle image (si uploadée)
        image_file = request.files.get("image")
        if image_file and allowed_file(image_file.filename):
            filename = secure_filename(image_file.filename)
            filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)
            image_file.save(filepath)
            image_url = f"/static/uploads/{filename}"

        cursor.execute("""
            UPDATE menu_items
            SET name=%s, description=%s, category=%s, rating=%s, price=%s, image_url=%s, updated_at=NOW()
            WHERE item_id=%s
        """, (name, description, category, rating, int(price), image_url, item_id))
        conn.commit()
        conn.close()

        flash("Dish updated successfully", "success")
        return redirect(url_for('index'))

    # GET → pré-remplir formulaire
    cursor.execute("SELECT * FROM menu_items WHERE item_id=%s", (item_id,))
    item = cursor.fetchone()
    conn.close()

    if not item:
        flash("Dish not found", "danger")
        return redirect(url_for('index'))

    return render_template('update_item.html',
                           item=item,
                           item_id=item_id,
                           year=datetime.now().year)


if __name__ == '__main__':
    app.run(debug=True)
