import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./OfferLetter.css";

function OfferLetterPreview() {
  const { id: applicationId } = useParams();
  const [offer, setOffer] = useState(null);
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const offers = JSON.parse(localStorage.getItem("offerLetters")) || [];
    const applications =
      JSON.parse(localStorage.getItem("applications")) || [];

    setOffer(
      offers.find(
        (o) => String(o.applicationId) === String(applicationId)
      ) || null
    );

    setApplication(
      applications.find(
        (a) => String(a.id) === String(applicationId)
      ) || null
    );
  }, [applicationId]);

  if (!offer || !application) {
    return <p style={{ marginTop: "25px" }}>Offer Letter not found.</p>;
  }

  const candidateName =
    application.employeeName || application.employee || "Candidate";

  /* ⭐ Date Format Fix — DD/MM/YYYY */
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB");
  };

  return (
    <div className="offer-wrapper">
      <div className="offer-paper">

        {/* HEADER */}
        <div className="offer-header">
          <h1>OFFER LETTER</h1>
          <p>XYZ Technologies Pvt. Ltd.</p>
        </div>

        {/* ⭐ PARAGRAPH FIRST (Professional Flow) */}
        <div className="offer-paragraph">
          <p>Dear {candidateName},</p>

          <p>
            We are pleased to offer you the position of <b>{offer.jobTitle}</b> at
            XYZ Technologies Pvt. Ltd. This offer is based on your skills,
            experience, and the discussions we have had.
          </p>

          <p>
            You are expected to join our organization on{" "}
            <b>{formatDate(offer.joiningDate)}</b>. Your employment will be
            governed by company policies and onboarding terms.
          </p>

          {offer.notes && (
            <p>
              <b>Note:</b> {offer.notes}
            </p>
          )}
        </div>

        {/* ⭐ DETAILS AFTER PARAGRAPH */}
        <div className="section-title">Employment Details</div>

        <table className="offer-table">
          <tbody>
            <tr>
              <td className="offer-label">Candidate Name</td>
              <td>{candidateName}</td>
            </tr>
            <tr>
              <td className="offer-label">Email</td>
              <td>{offer.email}</td>
            </tr>
            <tr>
              <td className="offer-label">Job Title</td>
              <td>{offer.jobTitle}</td>
            </tr>
            <tr>
              <td className="offer-label">Work Location</td>
              <td>{offer.location}</td>
            </tr>
            <tr>
              <td className="offer-label">Annual Salary</td>
              <td>₹ {Number(offer.salary).toLocaleString("en-IN")}</td>
            </tr>
            <tr>
              <td className="offer-label">Joining Date</td>
              <td>{formatDate(offer.joiningDate)}</td>
            </tr>
            <tr>
              <td className="offer-label">Offer Date</td>
              <td>{formatDate(offer.offerDate)}</td>
            </tr>
          </tbody>
        </table>

        {/* SIGNATURE */}
        <div className="signature">
          <p>Sincerely,</p>
          <p><b>Authorized Signatory</b></p>
          <p>HR Department</p>
        </div>

        {/* ⭐ BUTTON FIX */}
        <div className="btn-center">
          <button className="print-btn" onClick={() => window.print()}>
            Print Offer Letter
          </button>
        </div>

      </div>
    </div>
  );
}

export default OfferLetterPreview;
