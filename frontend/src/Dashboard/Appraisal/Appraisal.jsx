import React, {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

import "./Appraisal.css";


const Appraisal = () => {

  /* =============================
     STATE
  ============================== */
  const [appraisals,
    setAppraisals] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const navigate =
    useNavigate();

  const location =
    useLocation();


  /* =============================
     ROLE BASE PATH
  ============================== */
  const loggedUser =
    JSON.parse(
      localStorage.getItem(
        "loggedInUser"
      )
    ) || {};

  const base =
    loggedUser?.role?.toUpperCase()
      === "ADMIN"
      ? "/admin-dashboard"
      : "/employee-dashboard";



  /* =============================
     FETCH APPRAISALS FROM BACKEND ⭐⭐⭐
  ============================== */
  const fetchAppraisals =
    async () => {

      try {

        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {

          console.error(
            "No token found"
          );

          setAppraisals([]);
          return;

        }

        const response =
          await fetch(
            "http://localhost:8080/api/appraisals",
            {
              method: "GET",
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        if (!response.ok)
          throw new Error(
            "Fetch failed"
          );

        const data =
          await response.json();

        setAppraisals(
          Array.isArray(data)
            ? data
            : []
        );

      }
      catch (error) {

        console.error(
          "Error loading appraisals:",
          error
        );

        setAppraisals([]);

      }
      finally {

        setLoading(false);

      }

    };


  /* =============================
     LOAD ON PAGE LOAD
     AND WHEN ROUTE CHANGES
  ============================== */
  useEffect(() => {

    fetchAppraisals();

  }, [location]);



  /* =============================
     DELETE APPRAISAL ⭐⭐⭐
  ============================== */
  const handleDelete =
    async (id) => {

      if (!window.confirm(
        "Delete this appraisal?"
      )) return;

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(
            `http://localhost:8080/api/appraisals/${id}`,
            {
              method: "DELETE",
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        if (!response.ok)
          throw new Error(
            "Delete failed"
          );

        /* Reload from backend */
        fetchAppraisals();

      }
      catch (error) {

        console.error(
          "Delete error:",
          error
        );

        alert(
          "Delete failed"
        );

      }

    };



  /* =============================
     NAVIGATION
  ============================== */
  const handleAdd =
    () =>
      navigate(
        `${base}/appraisal/add`
      );

  const handleView =
    (id) =>
      navigate(
        `${base}/appraisal/view/${id}`
      );

  const handleEdit =
    (id) =>
      navigate(
        `${base}/appraisal/edit/${id}`
      );



  /* =============================
     STATUS STYLE
  ============================== */
  const getStatusClass =
    (status) => {

      switch (status) {

        case "Approved":
          return "status-approved";

        case "Pending":
          return "status-pending";

        case "Rejected":
          return "status-rejected";

        default:
          return "";

      }

    };



  /* =============================
     UI
  ============================== */
  return (

    <div className="appraisal-scope">

      <div className="appraisal-container">

        <h2 className="appraisal-title">
          Employee Appraisals
        </h2>


        {/* ADD BUTTON */}
        <div className="appraisal-header">

          <button
            className="add-btn"
            onClick={handleAdd}
          >
            Add New Appraisal
          </button>

        </div>


        {/* TABLE */}
        <table className="appraisal-table">

          <thead>

            <tr>

              <th>S No</th>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Review Period</th>
              <th>Rating</th>
              <th>Status</th>

              <th style={{
                textAlign: "center"
              }}>
                Actions
              </th>

            </tr>

          </thead>


          <tbody>

            {/* LOADING */}
            {loading ? (

              <tr>

                <td colSpan="7"
                  style={{
                    textAlign: "center"
                  }}>
                  Loading...
                </td>

              </tr>

            )

            /* NO DATA */
            : appraisals.length === 0 ? (

              <tr>

                <td colSpan="7"
                  style={{
                    textAlign: "center"
                  }}>
                  No Appraisals Found
                </td>

              </tr>

            )

            /* DATA */
            : (

              appraisals.map(
                (item, index) => (

                  <tr key={item.id}>

                    <td>
                      {index + 1}
                    </td>

                    <td>
                      {item.employeeName}
                    </td>

                    <td>
                      {item.department}
                    </td>

                    <td>
                      {item.reviewPeriod}
                    </td>

                    <td>
                      {item.rating}
                    </td>

                    <td>

                      <span className={
                        `status-badge ${getStatusClass(item.status)}`
                      }>
                        {item.status}
                      </span>

                    </td>


                    <td className="action-col">

                      <button
                        className="view-btn"
                        onClick={() =>
                          handleView(item.id)
                        }
                      >
                        View
                      </button>


                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleEdit(item.id)
                        }
                      >
                        Edit
                      </button>


                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(item.id)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default Appraisal;
