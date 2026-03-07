import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SalaryHistory.css";

function SalaryHistory() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [salaryRecords, setSalaryRecords] = useState([]);

  useEffect(() => {

    // ---------------- EMPLOYEE FETCH ----------------
    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    // Match using BOTH id & empId
    const emp = employees.find(
      e =>
        String(e.id) === String(id) ||
        String(e.empId) === String(id)
    );

    setEmployee(emp);

    // ---------------- SALARY FETCH ----------------
    const allSalary = JSON.parse(localStorage.getItem("salaryHistory")) || [];

    const empSalary = allSalary.filter(
      s =>
        String(s.empId) === String(id) ||
        String(s.empId) === String(emp?.id)
    );

    setSalaryRecords(empSalary);

  }, [id]);

  // ---------------- DELETE FUNCTION ----------------
  const handleDelete = (record) => {
    if (!window.confirm("Are you sure you want to delete this salary entry?"))
      return;

    let allSalary = JSON.parse(localStorage.getItem("salaryHistory")) || [];

    // Delete specific record safely
    allSalary = allSalary.filter(
      s =>
        !(
          String(s.empId) === String(record.empId) &&
          String(s.date) === String(record.date) &&
          Number(s.total) === Number(record.total)
        )
    );

    localStorage.setItem("salaryHistory", JSON.stringify(allSalary));

    // Refresh table
    const updated = allSalary.filter(
      s => String(s.empId) === String(id)
    );

    setSalaryRecords(updated);

    alert("Salary record deleted successfully");
  };


  return (
    <div className="salary-container">
      <h2>Salary History</h2>

      {employee ? (
        <div className="employee-info">
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Employee ID:</strong> {employee.empId || employee.id}</p>
          <p><strong>Department:</strong> {employee.department}</p>
        </div>
      ) : (
        <p style={{ color: "red" }}>Employee details not found</p>
      )}

      <table className="salary-table">
        <thead>
          <tr>
            <th>S No</th>
            <th>Salary</th>
            <th>Allowance</th>
            <th>Deduction</th>
            <th>Total</th>
            <th>Pay Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {salaryRecords.length > 0 ? (
            salaryRecords.map((rec, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{rec.salary}</td>
                <td>{rec.allowance}</td>
                <td>{rec.deduction}</td>
                <td>{rec.total}</td>
                <td>{rec.date}</td>

                <td>
                  <button
                    className="delete-salary-btn"
                    onClick={() => handleDelete(rec)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No Salary History Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SalaryHistory;
