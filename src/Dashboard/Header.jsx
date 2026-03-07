import "./Header.css";
import { getLoggedInUser, logout } from "./auth";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const user = getLoggedInUser();

  const handleLogout = () => {
    logout();               // ✅ clears loggedInUser
    navigate("/login");     // ✅ redirect safely
  };

  return (
    <div className="header">
      <h3>
        Welcome, {user?.role === "admin" ? "Admin" : "Employee"}
      </h3>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Header;
