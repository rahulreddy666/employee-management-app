import { useEffect, useState } from "react";
import "./LeaveAdmin.css";

function LeaveAdmin() {

  const [requests, setRequests] = useState([]);

  const token =
    localStorage.getItem("token");



  // ================= FETCH ALL LEAVES =================

  const fetchLeaves = async () => {

    try {

      const response =
        await fetch(
          "http://localhost:8080/api/leaves/all",
          {
            headers: {
              "Authorization":
                "Bearer " + token
            }
          }
        );

      if (response.status === 401) {

        alert("Session expired. Please login again.");

        localStorage.clear();

        window.location.href = "/";

        return;

      }

      if (!response.ok)
        throw new Error(
          "Failed to fetch leaves"
        );

      const data =
        await response.json();

      setRequests(data);

    }
    catch (error) {

      console.error(error);

      alert("Error loading leaves");

    }

  };



  useEffect(() => {

    fetchLeaves();

  }, []);



  // ================= UPDATE STATUS =================

  const handleStatusChange =
    async (id, newStatus) => {

      try {

        const url =
          newStatus === "Approved"
            ? `http://localhost:8080/api/leaves/approve/${id}`
            : `http://localhost:8080/api/leaves/reject/${id}`;

        const response =
          await fetch(url, {
            method: "PUT",
            headers: {
              "Authorization":
                "Bearer " + token
            }
          });

        if (response.status === 401) {

          alert(
            "Session expired. Please login again."
          );

          localStorage.clear();

          window.location.href = "/";

          return;

        }

        if (!response.ok)
          throw new Error(
            "Failed to update status"
          );

        alert("Leave Status Updated");

        fetchLeaves();

      }
      catch (error) {

        console.error(error);

        alert("Error updating leave");

      }

    };



  // ================= FORMAT DATE =================

  const formatDate = (date) => {

    if (!date) return "";

    return date.split("T")[0];

  };



  return (

    <div className="leave-admin-page">

      <h2>Leave Requests</h2>


      {/* ================= CURRENT LEAVE REQUESTS TABLE ================= */}

      {requests.length === 0 ? (

        <p className="no-requests">
          No Leave Requests Found
        </p>

      ) : (

        <table className="leave-table">

          <thead>

            <tr>
              <th>Employee ID</th>
              <th>Type</th>
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

                <td>{req.employeeId}</td>

                <td>{req.leaveType}</td>

                <td>
                  {formatDate(req.startDate)}
                </td>

                <td>
                  {formatDate(req.endDate)}
                </td>

                <td>{req.reason}</td>

                <td>
                  {formatDate(req.appliedDate)}
                </td>


                <td>

                  <select
                    value={req.status}
                    onChange={(e) =>
                      handleStatusChange(
                        req.id,
                        e.target.value
                      )
                    }
                  >

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Approved">
                      Approved
                    </option>

                    <option value="Rejected">
                      Rejected
                    </option>

                  </select>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}



      {/* ================= ALL EMPLOYEE LEAVE HISTORY ================= */}

      <h2 style={{ marginTop: "40px" }}>
        All Employees Leave History
      </h2>


      {requests.length === 0 ? (

        <p className="no-requests">
          No Leave History Found
        </p>

      ) : (

        <table className="leave-table">

          <thead>

            <tr>
              <th>Employee ID</th>
              <th>Type</th>
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

                <td>{req.employeeId}</td>

                <td>{req.leaveType}</td>

                <td>
                  {formatDate(req.startDate)}
                </td>

                <td>
                  {formatDate(req.endDate)}
                </td>

                <td>{req.reason}</td>

                <td>
                  {formatDate(req.appliedDate)}
                </td>


                <td
                  style={{
                    color:
                      req.status === "Approved"
                        ? "green"
                        : req.status === "Rejected"
                        ? "red"
                        : "#ff9800",
                    fontWeight: "bold",
                  }}
                >
                  {req.status}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>

  );

}

export default LeaveAdmin;