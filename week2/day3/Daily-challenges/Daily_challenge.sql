--Part I:

--1
CREATE TABLE customer (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE customer_profile (
    id SERIAL PRIMARY KEY,
    isLoggedIn BOOLEAN DEFAULT false,
    customer_id INT UNIQUE,  -- UNIQUE car One-to-One
    FOREIGN KEY (customer_id) REFERENCES customer(id)
);

--2
INSERT INTO customer (first_name, last_name)
VALUES 
('John', 'Doe'),
('Jerome', 'Lalu'),
('Lea', 'Rive');

--3
-- 
INSERT INTO customer_profile (isLoggedIn, customer_id)
VALUES (true, (SELECT id FROM customer WHERE first_name = 'John' AND last_name = 'Doe'));

-- 
INSERT INTO customer_profile (isLoggedIn, customer_id)
VALUES (false, (SELECT id FROM customer WHERE first_name = 'Jerome' AND last_name = 'Lalu'));

--4
SELECT c.first_name
FROM customer c
JOIN customer_profile cpf ON c.id = cpf.customer_id
WHERE cpf.isLoggedIn = true;

SELECT c.first_name, cpf.isLoggedIn
FROM customer c
LEFT JOIN customer_profile cpf ON c.id = cpf.customer_id;

SELECT COUNT(*)
FROM customer c
LEFT JOIN customer_profile cpf ON c.id = cpf.customer_id
WHERE cpf.isLoggedIn = false OR cpf.isLoggedIn IS NULL;

--Part II:
--1
CREATE TABLE book (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL
);

--2
INSERT INTO book (title, author)
VALUES 
('Alice In Wonderland', 'Lewis Carroll'),
('Harry Potter', 'J.K Rowling'),
('To kill a mockingbird', 'Harper Lee');

--3
CREATE TABLE student (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    age INT CHECK (age <= 15)
);

--4
INSERT INTO student (name, age)
VALUES
('John', 12),
('Lera', 11),
('Patrick', 10),
('Bob', 14);

--5
CREATE TABLE library (
    book_fk_id INT,
    student_fk_id INT,
    borrowed_date DATE,
    PRIMARY KEY (book_fk_id, student_fk_id, borrowed_date),
    FOREIGN KEY (book_fk_id) REFERENCES book(book_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (student_fk_id) REFERENCES student(student_id) ON DELETE CASCADE ON UPDATE CASCADE
);

--6
-- 
INSERT INTO library (book_fk_id, student_fk_id, borrowed_date)
VALUES (
    (SELECT book_id FROM book WHERE title = 'Alice In Wonderland'),
    (SELECT student_id FROM student WHERE name = 'John'),
    '2022-02-15'
);

-- 
INSERT INTO library (book_fk_id, student_fk_id, borrowed_date)
VALUES (
    (SELECT book_id FROM book WHERE title = 'To kill a mockingbird'),
    (SELECT student_id FROM student WHERE name = 'Bob'),
    '2021-03-03'
);

-- 
INSERT INTO library (book_fk_id, student_fk_id, borrowed_date)
VALUES (
    (SELECT book_id FROM book WHERE title = 'Alice In Wonderland'),
    (SELECT student_id FROM student WHERE name = 'Lera'),
    '2021-05-23'
);

--
INSERT INTO library (book_fk_id, student_fk_id, borrowed_date)
VALUES (
    (SELECT book_id FROM book WHERE title = 'Harry Potter'),
    (SELECT student_id FROM student WHERE name = 'Bob'),
    '2021-08-12'
);

--7
--
SELECT * FROM library;
--
SELECT s.name, b.title
FROM library l
JOIN student s ON l.student_fk_id = s.student_id
JOIN book b ON l.book_fk_id = b.book_id;
--
SELECT AVG(s.age) AS avg_age
FROM library l
JOIN student s ON l.student_fk_id = s.student_id
JOIN book b ON l.book_fk_id = b.book_id
WHERE b.title = 'Alice In Wonderland';
--
DELETE FROM student WHERE name = 'Bob';
-- When we delete a student from the Student table, all their related rows in the Library table are automatically deleted due to the ON DELETE CASCADE constraint.

