CREATE TABLE jobs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    company VARCHAR(255),
    location VARCHAR(255),
    description TEXT,
    responsibilities TEXT,
    requirements TEXT,
    benefits TEXT,
    posted_date DATE,
    status VARCHAR(50)
);

CREATE TABLE employees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    emp_id VARCHAR(50),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255),
    department VARCHAR(100),
    designation VARCHAR(100)
);

CREATE TABLE job_applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    job_id BIGINT,
    employee_id BIGINT,
    cover_letter TEXT,
    stage VARCHAR(50),
    applied_date DATETIME,
    
    FOREIGN KEY (job_id) REFERENCES jobs(id),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

CREATE TABLE application_files (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id BIGINT,
    file_name VARCHAR(255),
    file_path VARCHAR(500),
    uploaded_date DATETIME,

    FOREIGN KEY (application_id) REFERENCES job_applications(id)
);

INSERT INTO jobs (title, department, location, description, posted_date, active)
VALUES
('Frontend Engineer','IT','Hyderabad','Build scalable UI systems using React, Redux, and MUI.',NOW(),true),

('Backend Node.js Developer','IT','Hyderabad','Design and build scalable REST APIs and microservices.',NOW(),true);

SHOW TABLES;