import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./LeaveApply.css";

function LeaveApply() {

  const navigate = useNavigate();

  const { id } = useParams();

  const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

  const token =
    localStorage.getItem("token");


  // ================= STATE =================

  const [leaveType, setLeaveType] =
    useState("Casual");

  const [fromDate, setFromDate] =
    useState("");

  const [toDate, setToDate] =
    useState("");

  const [reason, setReason] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  // applied date for display only
  const appliedDate =
    new Date().toISOString().split("T")[0];



  // ================= VALIDATION =================

  const validateForm = () => {

    if (!token) {

      alert("Session expired. Please login again.");

      navigate("/");

      return false;

    }

    if (!id) {

      alert("Employee ID missing");

      return false;

    }

    if (!fromDate || !toDate) {

      alert("Please select From and To dates");

      return false;

    }

    if (new Date(fromDate) > new Date(toDate)) {

      alert("From Date cannot be after To Date");

      return false;

    }

    if (!reason.trim()) {

      alert("Please enter reason");

      return false;

    }

    return true;

  };



  // ================= SUBMIT LEAVE =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm())
      return;

    setLoading(true);

    try {

      const response =
        await fetch(
          "http://localhost:8080/api/leaves/apply",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token
            },

            body: JSON.stringify({

              employeeId: id,

              leaveType: leaveType,

              startDate: fromDate,

              endDate: toDate,

              reason: reason.trim()

            })

          }
        );


      if (response.status === 401) {

        alert("Session expired. Please login again.");

        localStorage.clear();

        navigate("/");

        return;

      }


      if (!response.ok) {

        const errorText =
          await response.text();

        throw new Error(
          errorText || "Failed to apply leave"
        );

      }


      const savedLeave =
        await response.json();

      console.log(
        "Leave applied:",
        savedLeave
      );


      alert("Leave Applied Successfully");


      navigate(
        "/dashboard/employee-details/leave-history"
      );

    }
    catch (error) {

      console.error(
        "Leave apply error:",
        error
      );

      alert(
        error.message ||
        "Error applying leave"
      );

    }
    finally {

      setLoading(false);

    }

  };



  // ================= UI =================

  return (

    <div className="leave-page-container">

      <div className="leave-card">

        <h2 className="leave-title">
          Apply Leave
        </h2>


        <form
          onSubmit={handleSubmit}
          className="leave-form"
        >


          <div className="row">

            <div>

              <label>Employee ID</label>

              <input
                value={id || ""}
                disabled
              />

            </div>


            <div>

              <label>Email</label>

              <input
                value={
                  loggedInUser?.email || ""
                }
                disabled
              />

            </div>

          </div>



          <div className="row">

            <div>

              <label>Leave Type</label>

              <select
                value={leaveType}
                onChange={(e) =>
                  setLeaveType(
                    e.target.value
                  )
                }
              >

                <option value="Casual">
                  Casual
                </option>

                <option value="Sick">
                  Sick
                </option>

                <option value="Annual">
                  Annual
                </option>

              </select>

            </div>


            <div>

              <label>Applied Date</label>

              <input
                value={appliedDate}
                disabled
              />

            </div>

          </div>



          <div className="row">

            <div>

              <label>From Date</label>

              <input
                type="date"
                value={fromDate}
                onChange={(e) =>
                  setFromDate(
                    e.target.value
                  )
                }
                required
              />

            </div>


            <div>

              <label>To Date</label>

              <input
                type="date"
                value={toDate}
                onChange={(e) =>
                  setToDate(
                    e.target.value
                  )
                }
                required
              />

            </div>

          </div>



          <div className="row-full">

            <label>Reason</label>

            <textarea

              value={reason}

              onChange={(e) =>
                setReason(
                  e.target.value
                )
              }

              placeholder="Enter leave reason"

              required

            />

          </div>



          <div className="button-row">

            <button
              className="btn-submit"
              type="submit"
              disabled={loading}
            >

              {
                loading
                  ? "Submitting..."
                  : "Submit Leave"
              }

            </button>


            <button
              type="button"
              className="btn-cancel"

              onClick={() =>
                navigate(
                  "/dashboard/employee-details/leave-history"
                )
              }
            >

              Cancel

            </button>

          </div>


        </form>

      </div>

    </div>

  );

}

export default LeaveApply;