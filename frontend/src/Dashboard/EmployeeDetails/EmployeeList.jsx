import React, { useEffect, useState } from "react";
import "./EmployeeList.css";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  // Load Employees
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);
  };

  // Delete Employee
  const handleDelete = (empId) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    let storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];

    const updatedList = storedEmployees.filter(
      (emp) =>
        String(emp.id) !== String(empId) &&
        String(emp.empId) !== String(empId)
    );

    localStorage.setItem("employees", JSON.stringify(updatedList));
    setEmployees(updatedList);

    alert("Employee Deleted Successfully!");
  };

  // ⭐ Name Resolver (Always Shows Correct Updated Name)
  const getEmployeeName = (emp) => {
    const first = emp.firstName?.trim() || "";
    const last = emp.lastName?.trim() || "";

    if (first || last) return `${first} ${last}`.trim();
    if (emp.name) return emp.name;       // old stored records
    return "Unnamed";                    // fallback
  };

  return (
    <div className="employee-list">
      <h3>Employee List</h3>

      {employees.length === 0 ? (
        <p>No employees added yet.</p>
      ) : (
        <ul>
          {employees.map((emp) => (
            <li key={emp.id}>
              <span>
                {getEmployeeName(emp)} ({emp.empId || emp.id})
              </span>

              <button onClick={() => handleDelete(emp.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EmployeeList;
