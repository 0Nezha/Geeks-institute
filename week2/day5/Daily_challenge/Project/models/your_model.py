from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Author(db.Model):
    __tablename__ = "authors"
    author_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    books = db.relationship("Book", secondary="books_authors", back_populates="authors")

class Book(db.Model):
    __tablename__ = "books"
    book_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    rating = db.Column(db.Float, default=0.0)
    publication_year = db.Column(db.Integer)
    genre = db.Column(db.String(50))

    authors = db.relationship("Author", secondary="books_authors", back_populates="books")

class BookAuthor(db.Model):
    __tablename__ = "books_authors"
    book_id = db.Column(db.Integer, db.ForeignKey("books.book_id"), primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey("authors.author_id"), primary_key=True)
    
