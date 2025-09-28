--Exercise 1 : Bonus Public Database (Continuation of XP)
--1
SELECT first_name, last_name
FROM customers
ORDER BY last_name ASC
OFFSET (SELECT COUNT(*) - 2 FROM customers);
/*
SELECT first_name, last_name
FROM customers
ORDER BY last_name DESC
LIMIT 2;*/

--2
DELETE FROM purchases
WHERE customer_id = (
    SELECT customer_id FROM customers WHERE first_name = 'Scott'
);

--3
SELECT * FROM customers 
WHERE first_name = 'Scott';
--Yes, Scott is still on the customers table.

--4 
--Using LEFT JOIN
SELECT p.id, p.item_id, c.first_name, c.last_name, p.quantity_purchased
FROM purchases p
LEFT JOIN customers c ON p.customer_id = c.customer_id;

--5
--Using INNER JOIN
SELECT p.id, p.item_id, c.first_name, c.last_name, p.quantity_purchased
FROM purchases p
INNER JOIN customers c ON p.customer_id = c.customer_id;

