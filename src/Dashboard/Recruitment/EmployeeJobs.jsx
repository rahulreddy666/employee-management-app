import { useState, useEffect } from "react";
import "./EmployeeJobs.css";

function EmployeeJobs() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    const jobList = JSON.parse(localStorage.getItem("internalJobs")) || [];
    const apps = JSON.parse(localStorage.getItem("applications")) || [];

    setJobs(jobList);
    setApplications(apps);
  }, []);

  const applyJob = (job) => {
    if (!loggedUser) return alert("Login Required");

    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    const empDetails =
      employees.find((e) => e.email === loggedUser.username) || {};

    const already = applications.some(
      (a) =>
        a.jobId === job.id &&
        (a.empId === loggedUser.empId ||
          a.email === loggedUser.username)
    );

    if (already) return alert("You already applied for this job!");

    const newApplication = {
      id: Date.now(),
      jobId: job.id,
      jobTitle: job.title,

      empId: loggedUser.empId || empDetails.empId || Date.now(),
      employee: loggedUser.name || empDetails.name || "Unknown",
      email: loggedUser.username || loggedUser.email || "N/A",

      department: empDetails.department || job.department || "Not Assigned",
      appliedDate: new Date().toLocaleDateString(),
      status: "Pending",
    };

    const updated = [...applications, newApplication];
    setApplications(updated);
    localStorage.setItem("applications", JSON.stringify(updated));

    alert("Job Applied Successfully");
  };

  const viewJob = (job) => {
    alert(
      `Job Title: ${job.title}\n\nDepartment: ${job.department}\n\nDescription: ${job.desc}`
    );
  };

  return (
    <div className="employee-jobs-page">
      <h2>Available Internal Job Openings</h2>

      <table className="employee-jobs-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Job Title</th>
            <th>Department</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td colSpan="5" className="employee-no-data">
                No Internal Jobs Posted Yet
              </td>
            </tr>
          ) : (
            jobs.map((job, index) => (
              <tr key={job.id}>
                <td>{index + 1}</td>
                <td>{job.title}</td>
                <td>{job.department}</td>
                <td>{job.desc}</td>

                <td>
                  <div className="employee-job-actions">
                    <button
                      type="button"
                      className="employee-view-btn"
                      onClick={() => viewJob(job)}
                    >
                      View
                    </button>

                    <button
                      type="button"
                      className="employee-apply-btn"
                      onClick={() => applyJob(job)}
                    >
                      Apply
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeJobs;
