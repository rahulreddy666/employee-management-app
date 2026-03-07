SELECT * FROM appraisals;

CREATE TABLE appraisals (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_name VARCHAR(255),
    department VARCHAR(255),
    review_period VARCHAR(255),
    rating DOUBLE,
    status VARCHAR(50),
    remarks VARCHAR(500),
    salary_increase DOUBLE
);

