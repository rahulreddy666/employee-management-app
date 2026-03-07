import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login2.css";

const Login2 = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!email.trim())
      validationErrors.email = "Email is required";

    if (!password.trim())
      validationErrors.password = "Password is required";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0)
      return;

    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim(),
            password: password.trim(),
          }),
        }
      );

      if (!response.ok)
        throw new Error("Invalid email or password");

      const user = await response.json();

      if (!user.token)
        throw new Error("Authentication token missing");

      const normalizedRole =
        user.role?.toUpperCase().trim();

      /* ===== STORE SESSION ===== */

      localStorage.setItem("token", user.token);

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          email: user.email,
          role: normalizedRole,
        })
      );

      console.log("LOGIN ROLE =", normalizedRole);

      /* ===== ROLE BASED ROUTING (FIXED) ===== */

      if (normalizedRole === "ADMIN") {
        navigate("/admin-dashboard");
      } else {
        navigate("/employee-dashboard");
      }

    } catch (error) {
      alert(error.message || "Login failed");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>

        <h2>Login</h2>

        <div className="form-group">
          <label>Email</label>

          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />

          {errors.email &&
            <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />

          {errors.password &&
            <span className="error">{errors.password}</span>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>
    </div>
  );
};

export default Login2;
