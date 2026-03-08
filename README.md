# Employee Management System

A **Full Stack Employee Management System** built using **React (Frontend), Spring Boot (Backend), and MySQL (Database)**.

The application allows administrators and HR teams to manage employees, handle recruitment processes, manage leave requests, and maintain internal job postings.
This project demonstrates **REST API development, authentication, and full CRUD operations** in a real-world enterprise-style application.

---

# Tech Stack

### Frontend

* React.js
* JavaScript
* HTML
* CSS

### Backend

* Java
* Spring Boot
* Spring Security
* REST APIs

### Database

* MySQL

### Tools

* Postman
* Git & GitHub
* Maven
* VS Code

---

# Implemented Features

The following modules have **both frontend and backend functionality implemented**:

* Employee Management (Add, Update, Delete, View employees)
* Authentication system with login
* Create / Reset login credentials for employees
* Recruitment pipeline management
* Leave request management
* Internal job portal
* Department / Domain management

---

# Frontend Modules (Backend Not Implemented)

The following modules currently have **frontend UI components created**, but backend APIs were **not implemented as part of the project scope**:

* View Job Applications
* Calendar
* Timesheets
* Timesheet History

---

# Project Scope

This project was developed as part of a learning assignment.

Backend development was implemented only for selected modules such as **Employee Management, Authentication, Recruitment, and Leave Management**.

Some modules like **Calendar, Timesheets, Timesheet History, and Job Applications** currently contain only frontend UI components. Backend implementation for these modules was **not included in the scope of this project**.

---

# Project Structure

```
employee-management-app
│
├── backend
│   └── Spring Boot backend application
│
├── frontend
│   └── React frontend application
│
├── database
│   └── MySQL SQL scripts
│
├── postman
│   └── API testing collection
│
├── images
│   └── Application screenshots
│
└── README.md
```

---

# Application Screenshots

### Login Page

![Login](images/Screenshot%20\(3005\).png)

### Dashboard

![Dashboard](images/Screenshot%20\(3006\).png)

### Employee Management

![Employees](images/Screenshot%20\(3007\).png)

### Leave Requests

![Leave](images/Screenshot%20\(3008\).png)

### Recruitment Management

![Recruitment](images/Screenshot%20\(3009\).png)

---

# How to Run the Project

## Backend

Navigate to backend folder

```
cd backend
```

Run Spring Boot application

```
mvn spring-boot:run
```

Server will start at:

```
http://localhost:8080
```

---

## Frontend

Navigate to frontend folder

```
cd frontend
```

Install dependencies

```
npm install
```

Start React application

```
npm start
```

Application will run at:

```
http://localhost:3000
```

---

# API Testing

All backend APIs were tested using **Postman**.
The Postman collection for this project is available in the `postman` folder of this repository.

---

# Author

**Rahul Reddy Karri**

GitHub
https://github.com/rahulreddy666

---

# License

This project is created for **learning and demonstration purposes**.
