CREATE DATABASE employee_management;
USE employee_management;
CREATE TABLE employees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

USE employee_management;

SELECT email, password, role
FROM employees;

DESC employees;

SELECT email, password, role FROM employees;
UPDATE employees
SET role = 'ADMIN'
WHERE email = 'admin@test.com';

SELECT email, role FROM employees;
SELECT email, role FROM employees;
SELECT email, role FROM employees;
SELECT id, email, role FROM employees;

SELECT email, role FROM employees WHERE email='admin@test.com';
SELECT email, password, role FROM employees;
SHOW DATABASES;

USE employee_management;
SHOW TABLES;
SELECT id, firstName, lastName, department, salary
FROM employee_profiles;

SELECT id, first_name, last_name, department, salary
FROM employee_profiles;
USE employee_management;
SHOW TABLES;

INSERT INTO domains (id, name, description)
SELECT id, name, description FROM departments;

SELECT * FROM domains;

DROP TABLE departments;

SHOW TABLES;
SELECT * FROM employees;






















