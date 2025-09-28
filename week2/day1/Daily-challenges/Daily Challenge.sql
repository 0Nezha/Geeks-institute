CREATE DATABASE hollywood;

CREATE TABLE actors(
 actor_id SERIAL PRIMARY KEY,
 first_name VARCHAR (50) NOT NULL,
 last_name VARCHAR (100) NOT NULL,
 age DATE NOT NULL,
 number_oscars SMALLINT NOT NULL
);

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES('Matt','Damon','08/10/1970', 5);

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES('George','Clooney','06/05/1961', 2);

--1
SELECT COUNT(*) AS total_actors
FROM actors;

--2
INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES('NERA', '');
"""The outcome will be an error: INSERT has more target columns than expressions,
so the number of values must match the number of specified columns."""