import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AddSalary.css";

const AddSalary = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sno, setSno] = useState(1);
  const [empName, setEmpName] = useState("");
  const [empId, setEmpId] = useState(id);

  const [salary, setSalary] = useState("");
  const [allowance, setAllowance] = useState("");
  const [deduction, setDeduction] = useState("");
  const [payDate, setPayDate] = useState("");

  useEffect(() => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    const emp = employees.find(
      e =>
        e?.id?.toString() === id?.toString() ||
        e?.empId?.toString() === id?.toString()
    );

    if (emp) {
      setEmpName(emp.name || emp.fullName || "");
      setEmpId(emp.empId || emp.id);
    }

    const stored = JSON.parse(localStorage.getItem("salaryHistory")) || [];
    if (stored.length > 0) setSno(stored.length + 1);

  }, [id]);

  const handleSave = () => {
    if (!salary || !allowance || !deduction || !payDate) {
      alert("Please fill all fields");
      return;
    }

    const newRecord = {
      sno,
      empId,
      name: empName,
      salary,
      allowance,
      deduction,
      total: Number(salary) + Number(allowance) - Number(deduction),
      date: payDate
    };

    const stored = JSON.parse(localStorage.getItem("salaryHistory")) || [];
    stored.push(newRecord);
    localStorage.setItem("salaryHistory", JSON.stringify(stored));

    alert("Salary Saved Successfully!");
    navigate(`/dashboard/employee-details/salary/${empId}`);
  };

  return (
    <div className="salary-add-container">
      <h2>Add Salary</h2>

      <div className="salary-card">

        <div className="salary-form">

          <div className="row">
            <label>S.No</label>
            <input value={sno} disabled />
          </div>

          <div className="row">
            <label>Emp ID</label>
            <input value={empId} disabled />
          </div>

          <div className="row">
            <label>Employee Name</label>
            <input value={empName} disabled />
          </div>

          <div className="row">
            <label>Salary</label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>

          <div className="row">
            <label>Allowance</label>
            <input
              type="number"
              value={allowance}
              onChange={(e) => setAllowance(e.target.value)}
            />
          </div>

          <div className="row">
            <label>Deduction</label>
            <input
              type="number"
              value={deduction}
              onChange={(e) => setDeduction(e.target.value)}
            />
          </div>

          <div className="row">
            <label>Pay Date</label>
            <input
              type="date"
              value={payDate}
              onChange={(e) => setPayDate(e.target.value)}
            />
          </div>

          <button className="save-btn" onClick={handleSave}>
            Save Salary
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSalary;
