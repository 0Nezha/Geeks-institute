
CREATE DATABASE countries_db;

CREATE TABLE countries (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    capital VARCHAR(100) NOT NULL,
    flag VARCHAR(100) NOT NULL,
    subregion VARCHAR(100) NOT NULL,
    population INT NOT NULL
);


SELECT * FROM countries;