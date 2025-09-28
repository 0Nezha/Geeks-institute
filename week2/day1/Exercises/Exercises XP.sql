
CREATE DATABASE "public";

-- Création de la table items

CREATE TABLE items (
item_id SERIAL PRIMARY KEY,
title VARCHAR (50) NOT NULL,
price INT NOT NULL
);

INSERT INTO items (item_id, title, price)
VALUES (1, 'Small Desk', 100  ),
       (2, 'Large desk', 300),
	   (3, 'Fan', 80);

-- Création de la table customers

CREATE TABLE customers (
customer_id SERIAL PRIMARY KEY,
first_name VARCHAR (50) NOT NULL,
last_name VARCHAR (50) NOT NULL
);

INSERT INTO customers (customer_id, first_name, last_name)
VALUES (1, 'Greg', 'Jones'),
       (2, 'Sandra', 'Jones'),
	   (3, 'Scott', 'Scott'),
	   (4, 'Trevor', 'Green'),
	   (5, 'Melanie', 'Johnson');

--All the items 
SELECT * FROM items;

--All the items with a price above 80 
SELECT * FROM items
WHERE price > 80;

--All the items with a price below 300
SELECT * FROM  items
WHERE price < 300;

--All customers whose last name is 'Smith'
SELECT * FROM customers WHERE last_name = 'Smith';
-- That will return no rows because the customers table doesn't have any last name 'Smith'.


--All customers whose last name is 'Jones'
SELECT * FROM customers WHERE last_name = 'Jones';

--All customers whose firstname is not 'Scott'
SELECT * FROM customers WHERE first_name != 'Scott';

