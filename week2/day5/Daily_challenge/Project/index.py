from flask import Flask, render_template, request, redirect, url_for, flash
from database.index import connect_to_db
import os
from dotenv import load_dotenv
from psycopg2.extras import RealDictCursor

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'supersecretkey')


@app.route('/')
def index():
    page = request.args.get('page', 1, type=int)
    per_page = 6  # nombre de cartes par page
    offset = (page - 1) * per_page

    conn = connect_to_db()
    if not conn:
        return render_template('index.html', books=[], page=page, total_pages=1)

    cursor = conn.cursor(cursor_factory=RealDictCursor)

    # Compter le nombre total de livres
    cursor.execute("SELECT COUNT(*) as total FROM books")
    total_books = cursor.fetchone()['total']
    total_pages = (total_books + per_page - 1) // per_page  # arrondi vers le haut

    # Récupérer les livres pour la page actuelle
    cursor.execute("""
        SELECT b.*, a.name AS author_name
        FROM books b
        LEFT JOIN books_authors ba ON b.book_id = ba.book_id
        LEFT JOIN authors a ON ba.author_id = a.author_id
        ORDER BY b.book_id DESC
        LIMIT %s OFFSET %s
    """, (per_page, offset))
    books = cursor.fetchall()
    conn.close()

    return render_template('index.html', books=books, page=page, total_pages=total_pages)



@app.route('/books/<int:id>')
def book_detail(id):
    conn = connect_to_db()
    if not conn:
        return render_template('details.html', book=None)

    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute(
        """
        SELECT b.*, a.name AS author_name
        FROM books b
        LEFT JOIN books_authors ba ON b.book_id = ba.book_id
        LEFT JOIN authors a ON ba.author_id = a.author_id
        WHERE b.book_id = %s
       """, (id,))
    book = cursor.fetchone()
    conn.close()

    if not book:
        flash("Book not found", "red")
        return redirect(url_for('index'))

    return render_template('details.html', book=book)


@app.route('/create', methods=['GET', 'POST'])
def create():
    if request.method == 'POST':
        payload = {
            'title': request.form.get('title', '').strip(),
            'description': request.form.get('description', '').strip(),
            'rating': request.form.get('rating', '').strip(),
            'publication_year': request.form.get('publication_year', '').strip(),
            'genre': request.form.get('genre', '').strip()
        }

        
        for key, value in payload.items():
            if not value:
                flash(f"{key} is required", "red")
                return render_template('create.html')

        # Convert rating and year
        try:
            payload['rating'] = float(payload['rating'])
        except:
            payload['rating'] = 0.0

        try:
            payload['publication_year'] = int(payload['publication_year'])
        except:
            payload['publication_year'] = 0

        conn = connect_to_db()
        if not conn:
            flash("Database connection failed", "red")
            return render_template('create.html')

        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO books (title, description, rating, publication_year, genre) VALUES (%s, %s, %s, %s, %s)",
            (payload['title'], payload['description'], payload['rating'], payload['publication_year'], payload['genre'])
        )
        conn.commit()
        conn.close()

        flash("Book created successfully", "blue")
        return redirect(url_for('index'))

    return render_template('create.html')


@app.route('/edit/<int:id>', methods=['GET', 'POST'])
def edit(id):
    conn = connect_to_db()
    if not conn:
        flash("Database connection failed", "red")
        return redirect(url_for('index'))

    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM books WHERE book_id = %s", (id,))
    book = cursor.fetchone()

    if not book:
        conn.close()
        flash("Book not found", "red")
        return redirect(url_for('index'))

    if request.method == 'POST':
        title = request.form.get('title', '').strip()
        description = request.form.get('description', '').strip()
        rating = request.form.get('rating', '0').strip()
        publication_year = request.form.get('publication_year', '0').strip()
        genre = request.form.get('genre', '').strip()

        try:
            rating = float(rating)
        except:
            rating = 0.0
        try:
            publication_year = int(publication_year)
        except:
            publication_year = 0

        cursor.execute(
            "UPDATE books SET title=%s, description=%s, rating=%s, publication_year=%s, genre=%s WHERE book_id=%s",
            (title, description, rating, publication_year, genre, id)
        )
        conn.commit()
        conn.close()

        flash("Book updated successfully", "blue")
        return redirect(url_for('book_detail', id=id))

    conn.close()
    return render_template('edit.html', book=book)


@app.route('/delete/<int:id>', methods=['POST'])
def delete(id):
    conn = connect_to_db()
    if not conn:
        flash("Database connection failed", "red")
        return redirect(url_for('index'))

    cursor = conn.cursor()
    cursor.execute("DELETE FROM books WHERE book_id = %s", (id,))
    conn.commit()
    conn.close()

    flash("Book deleted successfully", "blue")
    return redirect(url_for('index'))


@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query', '').strip()
    books = []

    if query:
        conn = connect_to_db()
        if conn:
            cursor = conn.cursor(cursor_factory=RealDictCursor)
            cursor.execute("""
                SELECT b.*, a.name as author_name
                FROM books b
                LEFT JOIN books_authors ba ON b.book_id = ba.book_id
                LEFT JOIN authors a ON ba.author_id = a.author_id
                WHERE b.title ILIKE %s OR a.name ILIKE %s
                ORDER BY b.book_id DESC
            """, (f'%{query}%', f'%{query}%'))
            books = cursor.fetchall()
            conn.close()

    return render_template('search.html', books=books)

@app.route('/stats')
def stats():
    conn = connect_to_db()
    if not conn:
        return render_template('stats.html', total_books=0, avg_rating=0, books_by_genre=[], latest_books=[])

    cursor = conn.cursor(cursor_factory=RealDictCursor)

    # Total books
    cursor.execute("SELECT COUNT(*) as total FROM books")
    total_books = cursor.fetchone()['total']

    # Average rating
    cursor.execute("SELECT AVG(rating) as avg_rating FROM books")
    avg_rating = cursor.fetchone()['avg_rating'] or 0

    # Books by genre
    cursor.execute("SELECT genre, COUNT(*) as count FROM books GROUP BY genre ORDER BY count DESC")
    books_by_genre = cursor.fetchall()

    # Latest books
    cursor.execute("""
        SELECT b.*, a.name as author_name
        FROM books b
        LEFT JOIN books_authors ba ON b.book_id = ba.book_id
        LEFT JOIN authors a ON ba.author_id = a.author_id
        ORDER BY b.book_id DESC
        LIMIT 5
    """)
    latest_books = cursor.fetchall()

    conn.close()

    return render_template('stats.html', 
                            total_books=total_books, 
                            avg_rating=avg_rating, 
                            books_by_genre=books_by_genre, 
                            latest_books=latest_books)



if __name__ == '__main__':
    app.run(debug=True, port=5001)
