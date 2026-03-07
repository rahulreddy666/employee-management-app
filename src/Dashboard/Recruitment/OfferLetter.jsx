import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function OfferLetter() {

  const { id: applicationId } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [salary, setSalary] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  /* LOAD APPLICATION */
  useEffect(() => {
    const apps = JSON.parse(localStorage.getItem("applications")) || [];
    const found = apps.find(
      (a) => String(a.id) === String(applicationId)
    );
    setApplication(found || null);
  }, [applicationId]);

  /* LOAD EXISTING OFFER */
  useEffect(() => {
    const offers = JSON.parse(localStorage.getItem("offerLetters")) || [];
    const existingOffer = offers.find(
      (o) => String(o.applicationId) === String(applicationId)
    );

    if (existingOffer) {
      setSalary(existingOffer.salary);
      setJoiningDate(existingOffer.joiningDate);
      setLocation(existingOffer.location);
      setNotes(existingOffer.notes || "");
    }
  }, [applicationId]);

  /* SAVE OFFER */
  const handleSaveOffer = () => {

    if (!salary || !joiningDate || !location) {
      alert("Please fill all required fields");
      return;
    }

    const offers = JSON.parse(localStorage.getItem("offerLetters")) || [];

    const updatedOffers = offers.filter(
      (o) => String(o.applicationId) !== String(applicationId)
    );

    updatedOffers.push({
      applicationId,
      email: application.email,
      jobTitle: application.jobTitle,
      salary,
      joiningDate,
      location,
      notes,
      offerDate: new Date().toISOString().split("T")[0]
    });

    localStorage.setItem("offerLetters", JSON.stringify(updatedOffers));

    /* Update application status */
    const apps = JSON.parse(localStorage.getItem("applications")) || [];

    const updatedApps = apps.map((a) =>
      String(a.id) === String(applicationId)
        ? { ...a, status: "Offer Sent" }
        : a
    );

    localStorage.setItem("applications", JSON.stringify(updatedApps));

    alert("Offer Letter Saved Successfully");

    navigate("/admin-dashboard/view-applicants");
  };

  if (!application) {
    return <p style={{ marginTop: "25px" }}>Application not found.</p>;
  }

  const candidateName =
    application.employeeName || application.employee || "Candidate";

  return (
    <div style={{ marginTop: "25px", maxWidth: "600px" }}>

      <h2>Generate Offer Letter</h2>

      <p><b>Name:</b> {candidateName}</p>
      <p><b>Email:</b> {application.email}</p>
      <p><b>Job Title:</b> {application.jobTitle}</p>

      <input
        type="number"
        placeholder="Annual Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />

      <label>Date of Joining</label>

      <input
        type="date"
        value={joiningDate}
        onChange={(e) => setJoiningDate(e.target.value)}
      />

      <input
        type="text"
        placeholder="Work Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <textarea
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button
        style={{
          marginTop: "15px",
          background: "#16a34a",
          color: "white",
          padding: "10px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer"
        }}
        onClick={handleSaveOffer}
      >
        Save Offer Letter
      </button>

    </div>
  );
}

export default OfferLetter;
