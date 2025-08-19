CREATE DATABASE "bootcamp";

-- Création de la table students

CREATE TABLE students (
student_id SERIAL  PRIMARY KEY,
first_name VARCHAR (50) NOT NULL,
last_name VARCHAR (50) NOT NULL,
birth_date DATE NOT NULL
);

--INSERT

INSERT INTO students (first_name, last_name, birth_date)
VALUES
('Marc', 'Benichou', '02/11/1998'),
('Yoan', 'Cohen', '03/12/2010'),
('Lea', 'Benichou', '27/07/1987'),
('Amelia', 'Dux', '07/04/1996'),
('David', 'Grez', '14/06/2003'),
('Omer', 'Simpson', '03/10/1980'),
('Nezha', 'AIT EL HAD', '18/07/2004');

"""
--SELECT
--1
SELECT * FROM students;"""

--1
SELECT first_name, last_name, birth_date FROM students
ORDER BY last_name ASC
LIMIT 4;

--2
SELECT first_name, last_name, birth_date FROM students
ORDER BY birth_date DESC
LIMIT 1;	

--3
SELECT first_name, last_name, birth_date
FROM students
LIMIT 3 OFFSET 2;




