import { useState, useEffect } from "react";
import "./ViewByRole.css";

function ViewByRole() {

  const [designations, setDesignations] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [employees, setEmployees] = useState([]);

  /* ================= LOAD DESIGNATIONS ================= */
  useEffect(() => {
    loadDesignations();
  }, []);

  const loadDesignations = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/designations",
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load designations");
      }

      const data = await response.json();
      setDesignations(data);

    } catch (error) {
      console.error(error);
      alert("Error loading designations");
    }
  };

  /* ================= LOAD EMPLOYEES ================= */
  useEffect(() => {
    if (!selectedDesignation) {
      setEmployees([]);
      return;
    }

    loadEmployeesByDesignation(selectedDesignation);

  }, [selectedDesignation]);

  const loadEmployeesByDesignation = async (designation) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8080/api/profile/by-designation/${designation}`,
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      // ✅ CASE 1: No employees found
      if (response.status === 204) {
        setEmployees([]);
        return;
      }

      // ❌ Real error
      if (!response.ok) {
        throw new Error("Failed to load employees");
      }

      // ✅ Employees found
      const data = await response.json();
      setEmployees(data);

    } catch (error) {
      console.error(error);
      alert("Error loading employees");
    }
  };

  return (
    <div className="view-role-container">

      <h2>View Employees By Designation</h2>

      <select
        value={selectedDesignation}
        onChange={(e) => setSelectedDesignation(e.target.value)}
      >
        <option value="">Select Designation</option>

        {designations.map((d) => (
          <option key={d.id} value={d.title}>
            {d.title}
          </option>
        ))}

      </select>

      {/* ================= EMPLOYEE TABLE ================= */}

      {selectedDesignation && employees.length === 0 && (
        <p style={{ marginTop: "20px" }}>
          No employees found for this designation.
        </p>
      )}

      {employees.length > 0 && (
        <table className="employee-table">
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.empId}</td>
                <td>{emp.firstName} {emp.lastName}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}

export default ViewByRole;