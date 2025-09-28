--Exercise 1:  Items and customers

--1

SELECT * FROM items
ORDER BY price ASC;

--2
SELECT * From items
WHERE price >= 80
ORDER BY price DESC;

--3

SELECT first_name, last_name FROM customers
ORDER BY first_name ASC
LIMIT 3;

--4
SELECT last_name FROM customers
ORDER BY last_name DESC;

--Exercise 2: Database: dvdrental

--1
SELECT * FROM customer;

--2
SELECT first_name || ' ' || last_name AS full_name FROM customer;

--3
SELECT DISTINCT create_date FROM customer;

--4
SELECT * FROM customer
ORDER BY first_name DESC;

--5
SELECT film_id, title, description, release_year, rental_rate FROM film
ORDER BY rental_rate ASC;

--6
SELECT address, phone FROM address
WHERE district = 'Texas';

--7
SELECT * FROM film
WHERE film_id IN (15, 150);

--8 
SELECT film_id, title, description, length, rental_rate FROM film
WHERE title = 'Basic Easy';--Favorite movie

--9
SELECT film_id, title, description, length, rental_rate FROM film
WHERE title LIKE 'Ba%';

--10 

SELECT film_id, title, description, length, rental_rate FROM film
ORDER BY rental_rate ASC
LIMIT 10;

--11
SELECT film_id, title, description, length, rental_rate FROM film
ORDER BY rental_rate ASC
OFFSET 0
FETCH NEXT 10 ROWS ONLY;

--12
SELECT customer.first_name, customer.last_name, payment.amount, payment.payment_date
FROM customer
JOIN payment ON customer.customer_id = payment.customer_id
ORDER BY customer.customer_id ASC;

--13
SELECT * FROM film
WHERE film_id NOT IN (SELECT film_id FROM inventory);

--14 
SELECT city.city, country.country
FROM city
JOIN country ON city.country_id = country.country_id;

--15
SELECT customer.customer_id, customer.first_name, customer.last_name, payment.amount, payment.payment_date
FROM customer
JOIN payment ON customer.customer_id = payment.customer_id
ORDER BY payment.staff_id;

