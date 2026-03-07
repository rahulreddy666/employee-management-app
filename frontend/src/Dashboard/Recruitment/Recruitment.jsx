import "./Recruitment.css";
import { useNavigate } from "react-router-dom";

function Recruitment() {
  const navigate = useNavigate();

  return (
    <div className="recruitment-container">
      <h2>Recruitment Module</h2>

      <div className="recruitment-buttons">

        <button onClick={() => navigate("designations")}>
          Generate Employee Designation
        </button>

        <button onClick={() => navigate("view-by-role")}>
          View Employees By Designation
        </button>

        <button onClick={() => navigate("create-login")}>
          Create Login Credentials
        </button>

        <button onClick={() => navigate("internal-portal")}>
          Internal Job Portal
        </button>

        <button
          className="recruit-btn"
          onClick={() => navigate("../view-applicants")}
        >
          View Job Applications
        </button>

      </div>
    </div>
  );
}

export default Recruitment;
