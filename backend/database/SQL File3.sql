CREATE DATABASE userdb;
USE userdb;
show databases;
DROP DATABASE IF EXISTS userdb;
CREATE DATABASE userdb;
SHOW DATABASES;

CREATE DATABASE userdb;
USE userdb;
show databases;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

