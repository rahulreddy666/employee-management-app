import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ViewEmployee.css";

function ViewEmployee() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD FROM BACKEND ================= */
  useEffect(() => {

    const loadEmployee = async () => {
      try {

        const token = localStorage.getItem("token");

        const res = await fetch(
          `http://localhost:8080/api/profile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!res.ok) {
          throw new Error("Employee not found");
        }

        const data = await res.json();
        setEmployee(data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadEmployee();

  }, [id]);

  /* ================= STATES ================= */

  if (loading) {
    return <p style={{padding:"20px"}}>Loading...</p>;
  }

  if (!employee) {
    return <p style={{padding:"20px"}}>Employee not found</p>;
  }

  /* ================= UI ================= */

  return (
    <div className="view-employee-page">
      <h2>Employee Details</h2>

      <div className="employee-card">
        <div className="details-grid">

          <div className="details-column">
            <p><strong>Name:</strong> {employee.firstName} {employee.lastName}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Employee ID:</strong> {employee.empId || "--"}</p>
            <p><strong>Date of Birth:</strong> {employee.dob || "--"}</p>
            <p><strong>Gender:</strong> {employee.gender || "--"}</p>
            <p><strong>Department:</strong> {employee.department || "--"}</p>
            <p><strong>Marital Status:</strong> {employee.maritalStatus || "--"}</p>
          </div>

          <div className="details-column">
            <p><strong>Designation:</strong> {employee.designation || "--"}</p>
            <p><strong>Salary:</strong> {employee.salary || "--"}</p>
            <p><strong>Role:</strong> {employee.role || "--"}</p>

            <p className="section-title">Bank Details</p>
            <p><strong>Bank:</strong> {employee.bankName || "--"}</p>
            <p><strong>Account:</strong> {employee.accountNumber || "--"}</p>
            <p><strong>IFSC:</strong> {employee.ifsc || "--"}</p>

            <p className="section-title">Education</p>
            <p><strong>Qualification:</strong> {employee.qualification || "--"}</p>
            <p><strong>University:</strong> {employee.university || "--"}</p>
            <p><strong>Year:</strong> {employee.passingYear || "--"}</p>

          </div>

        </div>
      </div>

      <button className="back-btn" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
}

export default ViewEmployee;
