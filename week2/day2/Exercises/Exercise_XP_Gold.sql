--Exercise 1: DVD Rental
--1/1 
SELECT rating, COUNT(*) AS total_films
FROM film
GROUP BY rating

--1/2
SELECT * FROM film 
WHERE rating IN ('G', 'PG-13')

--1/2/1 
SELECT * FROM film
WHERE rating IN ('G', 'PG-13')
AND length < 120
AND rental_rate < 3.00
ORDER BY title ASC;

--1/3
UPDATE customer
SET first_name = 'Nezha',
    last_name = 'AIT EL HAD',
    email = 'nezhaaitelhad@gmail.com'
WHERE customer_id = 1;

--1/4
SELECT c.customer_id, c.first_name, c.last_name, a.address, a.address_id
FROM customer c
JOIN address a ON c.address_id = a.address_id
WHERE c.customer_id = 1;


UPDATE address
SET address = '234 Rue Errahma',
    district = 'Casablanca',
    postal_code = '20000',
    phone = '0616331086'
WHERE address_id = 5; 


--Exercise 2: students table

--UPDATE
--1
UPDATE students
SET  birth_date = '1998/11/02'
WHERE student_id IN (1, 3);
/*
WHERE first_name = 'Lea' AND last_name = 'Benichou'
   OR first_name = 'Marc' AND last_name = 'Benichou';
*/

--2
UPDATE students 
SET last_name = 'Guez'
WHERE student_id = 5; --WHERE first_name = 'David' AND last_name = 'Grez'

--DELETE
--1
DELETE FROM students
WHERE first_name ='Lea' AND last_name = 'Benichou'

--COUNT
--1
SELECT COUNT(*) AS total_students
FROM students

--2
SELECT COUNT (*)
FROM students WHERE birth_date > '1/01/2000'

--INSERT / ALTER
--1
ALTER TABLE students
ADD COLUMN math_grade INTEGER;

--2
UPDATE students
SET math_grade = 80
WHERE student_id = 1;

--3
UPDATE students
SET math_grade = 90
WHERE student_id IN (2, 4);

--4 
UPDATE students 
SET math_grade = 40
WHERE student_id = 6;

--5
SELECT COUNT(*)
FROM students
WHERE math_grade > 83;

--6
INSERT INTO students (first_name, last_name, birth_date ,math_grade )
VALUES ('Omer', 'Simpson', '1980-10-03', '70'); 

--7 
SELECT * FROM students
--Bonus
SELECT first_name, last_name, COUNT(math_grade) AS total_grade
FROM students
GROUP BY  first_name,last_name
ORDER BY last_name;

--SUM
SELECT sum(math_grade) AS sum_grades 
FROM students;


--Exercise 3 : Items and customers
--Part 1
--1
CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(customer_id),
    item_id INTEGER REFERENCES items(item_id),
    quantity_purchased INTEGER NOT NULL
);

--2

INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES ( (SELECT customer_id FROM customers WHERE first_name = 'Scott' AND last_name = 'Scott'),
         (SELECT item_id FROM items WHERE title = 'Fan'),
          1),
       ( (SELECT customer_id FROM customers WHERE first_name = 'Melanie' AND last_name = 'Johnson'),
         (SELECT item_id FROM items WHERE title = 'Large desk'), 10),
       ( (SELECT customer_id FROM customers WHERE first_name = 'Greg' AND last_name = 'Jones'),
         (SELECT item_id FROM items WHERE title = 'Small Desk'), 2);

--Part 2
--1/1
SELECT * FROM purchases; --No, it lacks context about the customers and items.

--1/2
SELECT p.id, c.first_name, c.last_name, p.item_id, p.quantity_purchased
FROM purchases p
JOIN customers c ON p.customer_id = c.customer_id;

--1/3
SELECT p.id, c.first_name, c.last_name, p.item_id, p.quantity_purchased
FROM purchases p
JOIN customers c ON p.customer_id = c.customer_id
WHERE c.customer_id = 5;

--1/4
SELECT p.id, c.first_name, c.last_name, i.title, p.quantity_purchased
FROM purchases p
JOIN customers c ON p.customer_id = c.customer_id
JOIN items i ON p.item_id = i.item_id
WHERE i.title IN ('Large desk', 'Small Desk');

--2
SELECT p.id, c.first_name, c.last_name, i.title
FROM purchases p
JOIN customers c ON p.customer_id = c.customer_id
JOIN items i ON p.item_id = i.item_id;

--3
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (2, NULL, 8);
--Yes, it will only work if item_id is NULL, because foreign keys allow NULL. But if item_id is NOT NULL, the insert will fail.

--Fetch the last 2 customers in alphabetical order (A-Z) – exclude ‘id’ from the results.
SELECT first_name, last_name
FROM customers
ORDER BY last_name ASC
LIMIT 2;

--Use SQL to delete all purchases made by Scott.
DELETE FROM purchases
WHERE customer_id = (SELECT customer_id FROM customers WHERE first_name = 'Scott' AND last_name = 'Scott');

--Does Scott still exist in the customers table, even though he has been deleted? Try and find him.
SELECT * FROM customers
WHERE first_name = 'Scott' AND last_name = 'Scott';

--Use SQL to find all purchases. Join purchases with the customers table, so that Scott’s order will appear, although instead of the customer’s first and last name, you should only see empty/blank. (Which kind of join should you use?).
SELECT p.id, '' AS first_name, '' AS last_name, i.title, p.quantity_purchased
FROM purchases p
JOIN items i ON p.item_id = i.item_id
WHERE p.customer_id = (SELECT customer_id FROM customers WHERE first_name = 'Scott' AND last_name = 'Scott');