import { useEffect, useState } from "react";
import "./LeaveAdmin.css";   // same styles

function EmployeeLeaveHistory() {

  const [requests, setRequests] = useState([]);

  const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

  const token =
    localStorage.getItem("token");

  useEffect(() => {

    if (!loggedInUser || !token)
      return;

    fetch(
      `http://localhost:8080/api/leaves/employee/${loggedInUser.email}`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => {

        if (!response.ok)
          throw new Error("Failed to fetch leave history");

        return response.json();

      })
      .then(data => {

        setRequests(data);

      })
      .catch(error => {

        console.error("Error:", error);
        alert("Could not load leave history");

      });

  }, [loggedInUser, token]);


  return (
    <div className="leave-admin-page">

      <h2>My Leave History</h2>

      {requests.length === 0 ? (

        <p className="no-requests">
          No Leave Applications Found
        </p>

      ) : (

        <table className="leave-table">

          <thead>
            <tr>
              <th>Leave Type</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Applied</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {requests.map((req) => (

              <tr key={req.id}>

                <td>{req.leaveType}</td>

                <td>{req.startDate}</td>

                <td>{req.endDate}</td>

                <td>{req.reason}</td>

                <td>
                  {req.appliedDate
                    ? req.appliedDate.substring(0, 10)
                    : "-"
                  }
                </td>

                <td>
                  <span
                    style={{
                      color:
                        req.status === "Approved"
                          ? "green"
                          : req.status === "Rejected"
                          ? "red"
                          : "#ff9800",
                      fontWeight: "bold"
                    }}
                  >
                    {req.status}
                  </span>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );

}

export default EmployeeLeaveHistory;