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


--SELECT
--1
SELECT * FROM students;

--2
SELECT first_name, last_name FROM students; 

--3/1
SELECT first_name, last_name FROM students 
WHERE student_id = 2;

--3/2
SELECT first_name, last_name FROM students 
WHERE first_name = 'Marc' AND last_name = 'Benichou';

--3/3
SELECT first_name, last_name FROM students
WHERE  first_name = 'Marc' OR last_name = 'Benichou';

--3/4
SELECT first_name, last_name FROM students
WHERE first_name LIKE '%a%';

--3/5
SELECT first_name, last_name FROM students
WHERE  first_name LIKE 'a%';

--3/6
SELECT first_name, last_name FROM students
WHERE first_name LIKE '%a';

--3/7
SELECT first_name, last_name FROM students
WHERE first_name LIKE '%a_';

--3/8
SELECT first_name, last_name FROM students
WHERE student_id IN (1, 3);

--4
SELECT * FROM students
WHERE birth_date >= '01/01/2000';

