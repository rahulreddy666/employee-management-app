import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EmployeeForm() {
  const { id } = useParams(); // if id exists → Edit mode
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    empId: "",
    designation: "",
    salary: ""
  });

  const [designations, setDesignations] = useState([]);

  /* ==============================
     Load Designations
  ============================== */
  useEffect(() => {
    axios.get("http://localhost:8080/api/designations")
      .then(res => {
        setDesignations(res.data);
      })
      .catch(err => console.error("Designation fetch error:", err));
  }, []);

  /* ==============================
     Load Employee (Edit Mode)
  ============================== */
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/api/profile/${id}`)
        .then(res => {
          setEmployee({
            ...res.data,
            designation: res.data.designation
              ? res.data.designation.trim()   // 🔥 remove unwanted spaces
              : ""
          });
        })
        .catch(err => console.error("Employee fetch error:", err));
    }
  }, [id]);

  /* ==============================
     Debug Logs (CHECK IN BROWSER CONSOLE)
  ============================== */
  console.log("Employee designation:", employee.designation);
  console.log("All designations:", designations);
  console.log(
    "Match found:",
    designations.some(d => d.title === employee.designation)
  );

  /* ==============================
     Handle Input Change
  ============================== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /* ==============================
     Submit (Add or Update)
  ============================== */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      axios.put(`http://localhost:8080/api/profile/${id}`, employee)
        .then(() => navigate("/employees"))
        .catch(err => console.error(err));
    } else {
      axios.post("http://localhost:8080/api/profile", employee)
        .then(() => navigate("/employees"))
        .catch(err => console.error(err));
    }
  };

  return (
    <div>
      <h2>{id ? "Edit Employee" : "Add Employee"}</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="firstName"
          value={employee.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />

        <input
          type="text"
          name="lastName"
          value={employee.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />

        <input
          type="text"
          name="empId"
          value={employee.empId}
          onChange={handleChange}
          placeholder="Employee ID"
          required
        />

        {/* ==============================
           DESIGNATION DROPDOWN
        ============================== */}
        <select
          name="designation"
          value={employee.designation || ""}
          onChange={handleChange}
          required
        >
          <option value="">Select Designation</option>

          {designations.map(d => (
            <option key={d.id} value={d.title}>
              {d.title}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="salary"
          value={employee.salary}
          onChange={handleChange}
          placeholder="Salary"
          required
        />

        <button type="submit">
          {id ? "Update" : "Save"}
        </button>

      </form>
    </div>
  );
}