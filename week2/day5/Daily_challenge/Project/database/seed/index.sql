-- Supprimer les tables existantes si elles existent (*psql -U postgres -d books -f index.sql* )
DROP TABLE IF EXISTS books_authors CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS authors CASCADE;


CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    genre VARCHAR(50) NOT NULL,
    rating DECIMAL(2, 1) NOT NULL,
    publication_year INT NOT NULL
);

INSERT INTO books (title, description, genre, rating, publication_year) 
VALUES 
    (
       'To Kill a Mockingbird',
        $$Harper Lee's timeless classic explores the deep-seated issues of race, class, and morality in the American South through the eyes of young Scout Finch. As her father, Atticus Finch, defends a black man falsely accused of a crime, Scout and her brother Jem confront prejudice, injustice, and the complexities of human nature in a society struggling with its conscience.$$,
       'Fiction',
       4.8,
       1960
    ),
    (
        '1984',
        'A dystopian novel about totalitarianism and surveillance.',
        'Dystopian',
        4.7,
        1949
    ),
    (
        'Pride and Prejudice',
        'A romantic novel that critiques the British landed gentry at the end of the 18th century.',
        'Romance',
        4.6,
        1813
    ),
    (
        'The Great Gatsby',
        'A novel about the American dream and the disillusionment of the Jazz Age.',
        'Fiction',
        4.4,
        1925
    ),
    (
        'The Catcher in the Rye',
        'A novel about teenage rebellion and alienation.',
        'Fiction',
        4.0,
        1951
    ),
    (
        'The Alchemist',
        'A novel about a shepherd’s journey to realize his personal legend.',
        'Adventure',
        4.5,
        1988
    ),
    (
        'The Da Vinci Code',
        'A mystery thriller that follows symbologist Robert Langdon.',
        'Mystery',
        4.2,
        2003
    ),
    (
        'The Girl with the Dragon Tattoo',
        'A gripping mystery thriller that follows the brilliant but troubled hacker Lisbeth Salander and journalist Mikael Blomkvist as they investigate a decades-old disappearance in a wealthy Swedish family, uncovering dark secrets, corruption, and shocking truths along the way.',
        'Mystery',
        4.1,
        2005
    ),
    (
        'The Hunger Games',
        'A dystopian novel about a televised death match.',
        'Dystopian',
        4.5,
        2008
    ),
    (
        'The Fault in Our Stars',
        'A novel about two teenagers with cancer who fall in love.',
        'Young Adult',
        4.2,
        2012
    );

CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

INSERT INTO authors (name) 
VALUES
('Harper Lee'),
('George Orwell'),
('Jane Austen'),
('F. Scott Fitzgerald'),
('J.D. Salinger'),
('Paulo Coelho'),
('Dan Brown'),
('Stieg Larsson'),
('Suzanne Collins'),
('John Green');

CREATE TABLE books_authors (
    book_id INT REFERENCES books(book_id) ON DELETE CASCADE,
    author_id INT REFERENCES authors(author_id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, author_id)
);

INSERT INTO books_authors (book_id, author_id) 
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);


ALTER TABLE books ADD COLUMN image_url VARCHAR(255);


UPDATE books
SET image_url = 'https://cdn.britannica.com/21/182021-050-666DB6B1/book-cover-To-Kill-a-Mockingbird-many-1961.jpg'
WHERE book_id = 1;

UPDATE books
SET image_url = 'hhttps://images.unsplash.com/photo-1622609184693-58079bb6742f?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
WHERE book_id = 2;

UPDATE books
SET image_url = 'https://m.media-amazon.com/images/I/712P0p5cXIL._SY425_.jpg'
WHERE book_id = 3;

UPDATE books
SET image_url = 'https://example.com/images/the_great_gatsby.jpg'
WHERE book_id = 4;

UPDATE books
SET image_url = 'https://example.com/images/the_catcher_in_the_rye.jpg'
WHERE book_id = 5;

UPDATE books
SET image_url = 'https://example.com/images/the_alchemist.jpg'
WHERE book_id = 6;

UPDATE books
SET image_url = 'https://example.com/images/the_da_vinci_code.jpg'
WHERE book_id = 7;

UPDATE books
SET image_url = 'https://example.com/images/the_girl_with_the_dragon_tattoo.jpg'
WHERE book_id = 8;

UPDATE books
SET image_url = 'https://example.com/images/the_hunger_games.jpg'
WHERE book_id = 9;

UPDATE books
SET image_url = 'https://example.com/images/the_fault_in_our_stars.jpg'
WHERE book_id = 10;
