import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup2.css";

const Signup2 = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [role, setRole] = useState("employee");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirm = confirmPassword.trim();

    const validationErrors = {};

    if (!trimmedEmail) validationErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(trimmedEmail))
      validationErrors.email = "Email is invalid";

    if (!trimmedPassword) {
      validationErrors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/.test(
        trimmedPassword
      )
    ) {
      validationErrors.password =
        "Password must contain uppercase, lowercase, number, special character (min 6 chars)";
    }

    if (!trimmedConfirm) {
      validationErrors.confirmPassword = "Confirm password is required";
    } else if (trimmedConfirm !== trimmedPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const newUser = {
        email: trimmedEmail,
        password: trimmedPassword,
        role: role
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      if (role === "employee") {
        const employees = JSON.parse(localStorage.getItem("employees")) || [];

        const newEmployee = {
          id: Date.now().toString(),
          name: trimmedEmail.split("@")[0],
          email: trimmedEmail,
          dob: "Not Updated",
          department: "Not Assigned"
        };

        employees.push(newEmployee);
        localStorage.setItem("employees", JSON.stringify(employees));
      }

      alert("Signup Successful");
      navigate("/login");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <div className="form-group">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>

        <div className="form-group">
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* ===== BUTTON ROW HERE ===== */}
        <div className="signup-btn-row">
          <button type="submit" className="signup-btn">
            Sign Up
          </button>

          <button
            type="button"
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup2;
