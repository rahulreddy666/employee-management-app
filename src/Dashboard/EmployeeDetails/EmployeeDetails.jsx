import "./EmployeeDetails.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAdmin, isEmployee, getLoggedInUser } from "../auth";

function EmployeeDetails() {

  const navigate = useNavigate();

  const user = getLoggedInUser();
  const role = user?.role?.toUpperCase();

  const base =
    role === "ADMIN"
      ? "/admin-dashboard"
      : "/employee-dashboard";

  const [employees, setEmployees] = useState([]);
  const [searchEmpId, setSearchEmpId] = useState("");

  /* ================= LOAD EMPLOYEES FROM BACKEND ================= */
  useEffect(() => {

    const loadEmployees = async () => {
      try {

        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found");
          return;
        }

        const res = await fetch(
          "http://localhost:8080/api/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          console.error("Backend returned error:", res.status);
          return;
        }

        const data = await res.json();

        // ⭐ Remove corrupted / empty entries (prevents duplicates)
        const cleaned = data.filter(
          (e) => e && e.id != null
        );

        console.log("Employees Loaded:", cleaned);

        setEmployees(cleaned);

      } catch (err) {
        console.error("Failed loading employees:", err);
      }
    };

    loadEmployees();

  }, []);

  /* ================= SEARCH FILTER ================= */
  const filteredEmployees = isAdmin()
    ? employees.filter((emp) =>
        String(emp?.empId || "")
          .toLowerCase()
          .includes(searchEmpId.trim().toLowerCase())
      )
    : employees;

  /* ================= NAME HELPER ================= */
  const getEmployeeName = (emp) => {
    const first = emp?.firstName || "";
    const last = emp?.lastName || "";
    return `${first} ${last}`.trim();
  };

  /* ================= UI ================= */
  return (
    <div className="employee-page">

      <h2 className="employee-title">Manage Employees</h2>

      <div className="employee-actions">

        {isAdmin() && (
          <input
            type="text"
            placeholder="Search By Employee ID"
            className="search-box"
            value={searchEmpId}
            onChange={(e) => setSearchEmpId(e.target.value)}
          />
        )}

        {isAdmin() && (
          <button
            className="add-btn"
            onClick={() =>
              navigate(`${base}/employee-details/add`)
            }
          >
            Add New Employee
          </button>
        )}

      </div>

      <table className="employee-table">
        <thead>
          <tr>
            <th>S No</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Department</th>
            {(isAdmin() || isEmployee()) && <th>Action</th>}
          </tr>
        </thead>

        <tbody>

          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((emp, index) => (
              <tr key={`${emp.id}-${index}`}>

                <td>{index + 1}</td>
                <td>{getEmployeeName(emp)}</td>
                <td>{emp?.dob || "--"}</td>
                <td>{emp?.department || "--"}</td>

                {isAdmin() && (
                  <td className="actions">

                    <button
                      className="view"
                      onClick={() =>
                        navigate(`${base}/employee-details/view/${emp.id}`)
                      }
                    >
                      View
                    </button>

                    <button
                      className="edit"
                      onClick={() =>
                        navigate(`${base}/employee-details/edit/${emp.id}`)
                      }
                    >
                      Edit
                    </button>

                  </td>
                )}

                {isEmployee() && (
                  <td>
                    <button
                      className="salary"
                      onClick={() =>
                        navigate(`${base}/employee-details/leave/apply/${emp.id}`)
                      }
                    >
                      Apply Leave
                    </button>
                  </td>
                )}

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">
                No Employees Found
              </td>
            </tr>
          )}

        </tbody>
      </table>

    </div>
  );
}

export default EmployeeDetails;
