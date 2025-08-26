--Exercise 1: DVD Rental
--1
SELECT * FROM language;

--2
SELECT f.title, f.description, l.name
FROM film f
JOIN language l ON f.language_id = l.language_id;

--3
SELECT f.title, f.description, l.name
FROM film f
RIGHT JOIN language l ON f.language_id = l.language_id;

--4 
CREATE TABLE new_film (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

INSERT INTO new_film (name)
VALUES ('Maleficent'), 
       ('Fast & Furious 9'), 
       ('Godzilla vs. Kong')
;

--5 
CREATE TABLE customer_review (
    review_id SERIAL PRIMARY KEY,
    film_id INT NOT NULL,
    language_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    score INT CHECK (score >= 1 AND score <= 10),
    review_text TEXT,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (film_id) REFERENCES new_film(id) ON DELETE CASCADE,
    FOREIGN KEY (language_id) REFERENCES language(language_id) ON DELETE CASCADE
);

--6
INSERT INTO customer_review (film_id, language_id, title, score, review_text)
VALUES (1, 1, 'The dark knight', 9, 'I really enjoyed this film!'),
       (2, 2, 'Johnny english reborn', 6, '.....So funny!');

--7

DELETE FROM new_film
WHERE id = 1;
--The review associated with the deleted film will also be removed due to the ON DELETE CASCADE.

--Exercise 2: DVD Rental
--1
Update film
SET language_id = 5
Where film_id IN (18, 31);

--2 
--foreign keys: address (address_id), store (store_id).
--The customer table has foreign keys store_id and address_id, so any INSERT must use existing store and address IDs.

--3 
DROP TABLE customer_review;
--We can drop the customer review table, but we need to make sure no other table is referencing it first.

--4
SELECT COUNT(*) AS outstanding_rentals
FROM rental
WHERE return_date IS NULL;

--5
SELECT f.title, f.rental_rate
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE r.return_date IS NULL
ORDER BY f.rental_rate DESC
LIMIT 30;

--6
--6/1
SELECT f.title, f.description, a.first_name, a.last_name
FROM film f
JOIN film_actor fac ON f.film_id = fac.film_id
JOIN actor a ON fac.actor_id = a.actor_id
WHERE a.first_name = 'Penelope' AND a.last_name = 'Monroe'
  AND f.description ILIKE '%sumo%';

--6/2 
SELECT title, description, length, rating
FROM film
WHERE length < 60 AND rating = 'R';

--6/3 
SELECT f.title, f.description
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
JOIN payment p ON r.rental_id = p.rental_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE c.first_name = 'Matthew' AND c.last_name = 'Mahan'
  AND r.rental_date BETWEEN '2005-07-28' AND '2005-08-01'
  AND p.amount > 4.00;

--6/4
SELECT f.title, f.description, f.replacement_cost
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE c.first_name = 'Matthew'AND c.last_name = 'Mahan'
  AND (f.title ILIKE '%boat%' OR f.description ILIKE '%boat%')
ORDER BY f.replacement_cost DESC
LIMIT 1;