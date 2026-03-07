CREATE TABLE designations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO designations (title) VALUES ('HR');

INSERT INTO designations (title) VALUES ('Developer');

SELECT * FROM designations;

USE employee_management;

SELECT * FROM designations;

USE employee_management;

INSERT INTO designations (title) VALUES ('HR');

INSERT INTO designations (title) VALUES ('Developer');

SELECT * FROM designations;

SELECT * FROM employees;

ALTER TABLE employees ADD COLUMN designation_id INT;

SELECT * FROM designations;

UPDATE employees
SET designation_id = 3
WHERE name = 'K.Rahul';

SELECT id, name, designation, designation_id FROM employees;

UPDATE employees
SET designation_id = 4
WHERE name = 'SaiLakshmi K';

SELECT id, name FROM employees;

SELECT id, name, designation_id FROM employees;

SELECT * FROM designations;
SELECT id, name FROM employees;

UPDATE employees
SET designation_id = 3
WHERE id = 3;

UPDATE employees
SET designation_id = 4
WHERE id = 4;

SELECT id, name, designation_id FROM employees;

SELECT 
e.id,
e.name,
d.title AS designation
FROM employees e
JOIN designations d ON e.designation_id = d.id;

SELECT * FROM designations;

SELECT id, name FROM employees;

SELECT id, employee_id, name FROM employees;

SELECT * FROM designations;

INSERT INTO designations (title) VALUES ('IT');
SELECT * FROM designations;

INSERT INTO employees (employee_id, name)
VALUES ('EMP002', 'SaiLakshmi K');

SELECT id, employee_id, name FROM employees;

UPDATE employees
SET designation_id = 2
WHERE id = 3;

UPDATE employees
SET designation_id = 3
WHERE id = 4;

SELECT 
e.id,
e.employee_id,
e.name,
d.title AS designation
FROM employees e
LEFT JOIN designations d
ON e.designation_id = d.id;

SELECT 
e.id,
e.employee_id,
e.name,
d.title AS designation
FROM employees e
LEFT JOIN designations d
ON e.designation_id = d.id;

UPDATE employees
SET designation_id = 1
WHERE id = 2;

SHOW TABLES;

SELECT * FROM employee_details;

UPDATE designations
SET created_at = NOW()
WHERE created_at IS NULL;

SELECT id FROM designations WHERE created_at IS NULL;

DESCRIBE designations;

ALTER TABLE designations
MODIFY created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;

SELECT id, title, created_at FROM designations;

UPDATE designations
SET created_at = NOW()
WHERE created_at IS NULL;

SET SQL_SAFE_UPDATES = 0;

SELECT id, title, created_at FROM designations;

SELECT id, title, created_at FROM designations;

SET SQL_SAFE_UPDATES = 0;

SET SQL_SAFE_UPDATES = 0;

UPDATE designations
SET created_at = NOW()
WHERE id IS NOT NULL AND created_at IS NULL;

SELECT id, title, created_at FROM designations;

USE employee_management;

SET SQL_SAFE_UPDATES = 0;

UPDATE designations
SET created_at = NOW()
WHERE created_at IS NULL;

SELECT id, title, created_at FROM designations;
