-- Exercise 1 : DVD Rentals
-- 1:
SELECT * FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE r.return_date IS NULL;

-- 2:
SELECT c.customer_id, c.first_name, c.last_name, 
COUNT(r.rental_id) AS unreturned_rentals
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
WHERE r.return_date IS NULL
GROUP BY c.customer_id, c.first_name, c.last_name

-- 3:
SELECT title, description
FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
WHERE c.name = 'Action' AND a.first_name='Joe' AND a.last_name='Swank';

--view
SELECT title , description
FROM film_list
WHERE category = 'Action'
  AND actors LIKE '%Joe Swank%';


-- Exercise 2 – Happy Halloween
-- 1:
SELECT s.store_id, c.city, co.country
FROM store s
JOIN address a   ON s.address_id = a.address_id
JOIN city c      ON a.city_id = c.city_id
JOIN country co  ON c.country_id = co.country_id;
-- 2/3:
SELECT i.store_id,
       SUM(f.length) AS total_minutes,
       SUM(f.length)/60.0 AS total_hours,
       SUM(f.length)/60.0/24.0 AS total_days
FROM inventory i
JOIN film f ON i.film_id = f.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
WHERE r.return_date IS NOT NULL
GROUP BY i.store_id;
-- 4:
SELECT DISTINCT cus.customer_id,
       cus.first_name,
       cus.last_name,
       ci.city
FROM customer cus
JOIN address a ON cus.address_id = a.address_id
JOIN city ci ON a.city_id = ci.city_id
WHERE ci.city_id IN (
    SELECT ac.city_id
    FROM store s
    JOIN address ac ON s.address_id = ac.address_id
);
-- 5:
SELECT DISTINCT cus.customer_id,
       cus.first_name,
       cus.last_name,
       co.country
FROM customer cus
JOIN address a ON cus.address_id = a.address_id
JOIN city ci ON a.city_id = ci.city_id
JOIN country co ON ci.country_id = co.country_id
WHERE co.country_id IN (
    SELECT ci1.country_id
    FROM store s
    JOIN address ac ON s.address_id = ac.address_id
    JOIN city ci1 ON ac.city_id = ci1.city_id
);
-- 6:
CREATE TABLE safe_film AS
SELECT f.film_id,
       f.title,
       f.description,
       f.length
FROM film f
WHERE f.film_id NOT IN (
    SELECT fc.film_id
    FROM film_category fc
    JOIN category c ON fc.category_id = c.category_id
    WHERE c.name = 'Horror'
)
AND f.title NOT ILIKE '%beast%'
AND f.title NOT ILIKE '%monster%'
AND f.title NOT ILIKE '%ghost%'
AND f.title NOT ILIKE '%dead%'
AND f.title NOT ILIKE '%zombie%'
AND f.title NOT ILIKE '%undead%'
AND f.description NOT ILIKE '%beast%'
AND f.description NOT ILIKE '%monster%'
AND f.description NOT ILIKE '%ghost%'
AND f.description NOT ILIKE '%dead%'
AND f.description NOT ILIKE '%zombie%'
AND f.description NOT ILIKE '%undead%';

-- Total safe 
SELECT SUM(length) AS total_minutes,
       SUM(length)/60.0 AS total_hours,
       SUM(length)/60.0/24.0 AS total_days
FROM safe_film;

-- 7:
-- SELECT SUM(length) AS total_minutes,
--        SUM(length)/60.0 AS total_hours,
--        SUM(length)/60.0/24.0 AS total_days
-- FROM film;