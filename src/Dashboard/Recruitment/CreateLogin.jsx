import { useState, useEffect } from "react";
import "./CreateLogin.css";

/* =========================
   HELPERS
========================= */

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/* =========================
   COMPONENT
========================= */

function CreateLogin() {

  const [employees, setEmployees] = useState([]);
  const [users, setUsers] = useState([]);

  const [selectedEmp, setSelectedEmp] = useState("");
  const [username, setUsername] = useState("");
  const [designation, setDesignation] = useState("");

  /* =========================
        FETCH EMPLOYEES
     ========================= */

  const fetchEmployees = async () => {
    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/employees/dropdown",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      console.log("Employees from API:", data);

      setEmployees(data);

    } catch (error) {

      console.error("Failed to fetch employees:", error);

    }
  };

  /* =========================
        FETCH CREATED LOGINS
     ========================= */

  const fetchCreatedLogins = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/employees/created-logins",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      console.log("Created logins:", data);

      setUsers(data);

    } catch (error) {

      console.error("Failed to fetch created logins:", error);

    }
  };

  /* =========================
        LOAD DATA
     ========================= */

  useEffect(() => {

    fetchEmployees();

    fetchCreatedLogins();

  }, []);

  /* =========================
        SELECT EMPLOYEE
     ========================= */

  const handleSelect = (id) => {

    setSelectedEmp(id);

    const emp = employees.find((e) => String(e.id) === String(id));

    if (!emp) return;

    setDesignation(emp.designation || "employee");

    setUsername(emp.email || "");
  };

  /* =========================
        CREATE LOGIN
     ========================= */

  const handleCreate = async () => {

    if (!selectedEmp) return alert("Please select an employee");

    if (!isValidEmail(username)) return alert("Invalid email format");

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/employees/create-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            employeeId: selectedEmp,
            email: username,
            role: designation || "EMPLOYEE"
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create login");
      }

      const generatedPassword = await response.text();

      alert(
        `Login Created Successfully\n\nUsername: ${username}\nPassword: ${generatedPassword}`
      );

      // refresh table from backend
      fetchCreatedLogins();

    } catch (error) {

      console.error("Create login error:", error);

      alert("Failed to create login");

    }
  };

  /* =========================
        RESET PASSWORD
     ========================= */

  const handleReset = () => {

    alert("Reset password API will be added later.");

  };

  return (
    <div className="create-login-page">

      <h2>Create / Reset Login Credentials</h2>

      <div className="create-login-form">

        <select
          value={selectedEmp}
          onChange={(e) => handleSelect(e.target.value)}
        >
          <option value="">Select Employee</option>

          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.fullName || emp.name}
            </option>
          ))}

        </select>

        <input type="text" value={designation} disabled />

        <input
          type="text"
          placeholder="Email / Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="text"
          placeholder="Password will be auto-generated"
          disabled
        />

        <button className="create-login-btn" onClick={handleCreate}>
          Create Login
        </button>

      </div>

      {/* TABLE */}

      <div className="create-login-table-card">

        <table className="create-login-table">

          <thead>
            <tr>
              <th>S.No</th>
              <th>Employee</th>
              <th>Username</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-users">
                  No users created
                </td>
              </tr>
            ) : (
              users.map((u, i) => (
                <tr key={u.id}>
                  <td>{i + 1}</td>
                  <td>{u.email}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button
                      className="reset-btn"
                      onClick={() => handleReset(u.id)}
                    >
                      Reset Password
                    </button>
                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default CreateLogin;