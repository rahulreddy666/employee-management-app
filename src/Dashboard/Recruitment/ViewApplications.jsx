import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewApplications.css";

function ViewApplications() {
  const [apps, setApps] = useState([]);
  const navigate = useNavigate();

  // Load and merge applications with offer status
  useEffect(() => {
    const applications =
      JSON.parse(localStorage.getItem("applications")) || [];

    const offerLetters =
      JSON.parse(localStorage.getItem("offerLetters")) || [];

    const merged = applications.map((app) => {
      const offer = offerLetters.find(
        (o) => String(o.applicationId) === String(app.id)
      );

      return {
        ...app,
        offerStatus: offer?.status || "NOT SENT",
        applicationId: app.id,
      };
    });

    setApps(merged);
  }, []);

  // ⭐ Correct Nested Navigation (RELATIVE)
  const viewOffer = (id) => {
    navigate(`../recruitment/offer-preview/${id}`);
  };

  const editOffer = (id) => {
    navigate(`../recruitment/offer-letter/${id}`);
  };

  return (
    <div className="view-applications-page">
      <h2>Job Applications (Admin)</h2>

      <div className="view-applications-table-card">
        <table className="view-applications-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Employee</th>
              <th>Email</th>
              <th>Job Title</th>
              <th>Offer Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {apps.length === 0 ? (
              <tr>
                <td colSpan="6">No applications found</td>
              </tr>
            ) : (
              apps.map((app, i) => (
                <tr key={app.id}>
                  <td>{i + 1}</td>
                  <td>{app.employee}</td>
                  <td>{app.email}</td>
                  <td>{app.jobTitle}</td>

                  <td
                    className={`offer-status ${app.offerStatus
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {app.offerStatus}
                  </td>

                  <td>
                    <div className="view-applications-actions">
                      {app.offerStatus !== "NOT SENT" && (
                        <button
                          className="view-btn"
                          onClick={() => viewOffer(app.applicationId)}
                        >
                          View
                        </button>
                      )}

                      {app.offerStatus !== "ACCEPTED" && (
                        <button
                          className="edit-btn"
                          onClick={() => editOffer(app.applicationId)}
                        >
                          Edit / Resend
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewApplications;
