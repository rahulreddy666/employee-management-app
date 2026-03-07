DROP TABLE leave_requests;

CREATE TABLE leave_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id VARCHAR(50),
    leave_type VARCHAR(50),
    start_date DATE,
    end_date DATE,
    reason TEXT,
    status ENUM('Pending','Approved','Rejected') DEFAULT 'Pending',
    applied_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE leave_requests;

SELECT * FROM leave_requests;

DESCRIBE leave_requests;

ALTER TABLE leave_requests
MODIFY applied_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP;