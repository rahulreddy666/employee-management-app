import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../auth";
import "./EmployeeOffers.css";

function EmployeeOffers() {
  const navigate = useNavigate();
  const user = getLoggedInUser();

  const [offers, setOffers] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const storedOffers =
      JSON.parse(localStorage.getItem("offerLetters")) || [];

    const myOffers = storedOffers.filter(
      (o) => o.email === user.email
    );

    setOffers(myOffers);
  }, [user?.email]);

  const updateOfferStatus = (applicationId, status) => {
    const storedOffers =
      JSON.parse(localStorage.getItem("offerLetters")) || [];

    const updatedOffers = storedOffers.map((o) =>
      String(o.applicationId) === String(applicationId)
        ? { ...o, status }
        : o
    );

    localStorage.setItem(
      "offerLetters",
      JSON.stringify(updatedOffers)
    );

    setOffers(
      updatedOffers.filter((o) => o.email === user.email)
    );

    alert(`Offer ${status}`);
  };

  const viewOffer = (applicationId) => {
    navigate(`/dashboard/recruitment/offer-preview/${applicationId}`);
  };

  return (
    <div className="employee-offers-page">
      <h2>My Job Offers</h2>

      {offers.length === 0 ? (
        <p className="employee-no-data">No offers received yet.</p>
      ) : (
        <table className="employee-offers-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Job Title</th>
              <th>Salary</th>
              <th>Joining Date</th>
              <th>Location</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {offers.map((o, i) => (
              <tr key={o.applicationId}>
                <td>{i + 1}</td>
                <td>{o.jobTitle}</td>
                <td>₹{o.salary}</td>
                <td>{o.joiningDate}</td>
                <td>{o.location}</td>
                <td>{o.status || "SENT"}</td>

                <td>
                  <div className="employee-offer-actions">
                    <button
                      type="button"
                      className="employee-view-btn"
                      onClick={() => viewOffer(o.applicationId)}
                    >
                      View
                    </button>

                    {(!o.status || o.status === "SENT") && (
                      <>
                        <button
                          type="button"
                          className="employee-accept-btn"
                          onClick={() =>
                            updateOfferStatus(o.applicationId, "ACCEPTED")
                          }
                        >
                          Accept
                        </button>

                        <button
                          type="button"
                          className="employee-reject-btn"
                          onClick={() =>
                            updateOfferStatus(o.applicationId, "REJECTED")
                          }
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmployeeOffers;
