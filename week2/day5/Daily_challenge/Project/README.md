# 📚 BooksApp

BooksApp est une application web construite avec **Flask** et **PostgreSQL**.  
Elle permet de gérer une bibliothèque de livres (CRUD), avec recherche, statistiques et affichage détaillé.

---

## 🚀 Fonctionnalités

- Ajouter, modifier et supprimer des livres
- Lier des livres avec un ou plusieurs auteurs
- Rechercher un livre par titre
- Consulter les détails d’un livre
- Afficher des statistiques (nombre de livres, auteurs, genres, etc.)
- Interface web simple avec Flask et Jinja2

---

## 🛠️ Technologies utilisées

- **Python 3**  
- **Flask** (Framework backend)  
- **PostgreSQL** (Base de données)  
- **psycopg2** (Connexion à PostgreSQL)  
- **HTML / Jinja2 / TailwindCSS** (Frontend)

---

## ⚙️ Installation

1. Cloner le projet :
git clone https://github.com/0Nezha/Geeks-institute.git
cd booksapp

2. Créer un environnement virtuel et installer les dépendances :
python -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows

pip install -r requirements.txt

3.Configurer la base de données PostgreSQL :
CREATE DATABASE books_db;

-- Tables nécessaires
CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    rating FLOAT DEFAULT 0,
    publication_year INT,
    genre VARCHAR(50)
);

CREATE TABLE books_authors (
    book_id INT REFERENCES books(book_id) ON DELETE CASCADE,
    author_id INT REFERENCES authors(author_id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, author_id)
);

4.Vérifie le fichier database/index.py et mets à jour les informations de connexion PostgreSQL si besoin :
conn = psycopg2.connect(
    host="localhost",
    database="books_db",
    user="postgres",
    password="ton_mot_de_passe"
)

▶️ Lancer l’application
python index.py


Puis ouvre ton navigateur sur :
👉 http://127.0.0.1:5001/

📂 Structure du projet
# Required structure
# Required structure
project/
├── index.py              # Main Flask application
├── models/
│   └── your_model.py     # Database models
├── database/
│   ├── index.py          # Database connection
│   └── seed/
│       └── index.sql     # Database schema and seed data
├── templates/
│   ├── base.html         # Base template
│   ├── index.html        # List view
│   ├── create.html       # Create form
│   ├── edit.html         # Edit form
│   ├── details.html      # Detail view
│   └── stats.html        # Statistics page
└── requirements.txt      # Python dependencies



