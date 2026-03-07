import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* AUTH */
import Login2 from "./components/Login2";
import Signup2 from "./components/Signup2";

/* DASHBOARDS */
import Dashboard from "./Dashboard/Dashboard";

/* EMPLOYEE MODULE */
import EmployeeDetails from "./Dashboard/EmployeeDetails/EmployeeDetails";
import AddEmployee from "./Dashboard/EmployeeDetails/AddEmployee";
import ViewEmployee from "./Dashboard/EmployeeDetails/ViewEmployee";
import SalaryHistory from "./Dashboard/EmployeeDetails/SalaryHistory";
import LeaveAdmin from "./Dashboard/EmployeeDetails/LeaveAdmin";
import EmployeeLeaveHistory from "./Dashboard/EmployeeDetails/EmployeeLeaveHistory";
import AddSalary from "./Dashboard/EmployeeDetails/AddSalary";





/* TIMESHEET */
import Timesheet from "./Dashboard/Timesheet/Timesheet";
import TimesheetHistory from "./Dashboard/Timesheet/TimesheetHistory";

/* CALENDAR */
import Calendar from "./components/Calendar";

/* APPRAISAL */
import Appraisal from "./Dashboard/Appraisal/Appraisal";
import AppraisalForm from "./Dashboard/Appraisal/AppraisalForm";
import AppraisalView from "./Dashboard/Appraisal/AppraisalView";

/* RECRUITMENT */
import Recruitment from "./Dashboard/Recruitment/Recruitment";
import Designations from "./Dashboard/Recruitment/Designations";
import ViewByRole from "./Dashboard/Recruitment/ViewByRole";
import CreateLogin from "./Dashboard/Recruitment/CreateLogin";
import InternalPortal from "./Dashboard/Recruitment/InternalPortal";
import OfferLetter from "./Dashboard/Recruitment/OfferLetter";
import OfferLetterPreview from "./Dashboard/Recruitment/OfferLetterPreview";
import EmployeeOffers from "./Dashboard/Recruitment/EmployeeOffers";

/* JOBS */
import EmployeeJobs from "./Dashboard/Recruitment/EmployeeJobs";
import ViewApplications from "./Dashboard/Recruitment/ViewApplications";

/* AUTH GUARD */
import { isLoggedIn } from "./Dashboard/auth";

const Protected = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route path="/login" element={<Login2 />} />
        <Route path="/signup" element={<Signup2 />} />

        {/* ================= ADMIN DASHBOARD ================= */}
        <Route
          path="/admin-dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        >
          <Route index element={<EmployeeDetails />} />

          {/* EMPLOYEES */}
          <Route path="employee-details" element={<EmployeeDetails />} />
          <Route path="employee-details/add" element={<AddEmployee />} />
          <Route path="employee-details/edit/:id" element={<AddEmployee />} />
          <Route path="employee-details/view/:id" element={<ViewEmployee />} />
          <Route path="employee-details/salary/:id" element={<SalaryHistory />} />
          <Route path="employee-details/salary/add/:id" element={<AddSalary />} />
          <Route path="employee-details/leaves" element={<LeaveAdmin />} />

          
          


          {/* APPRAISAL */}
          <Route path="appraisal" element={<Appraisal />} />
          <Route path="appraisal/add" element={<AppraisalForm />} />
          <Route path="appraisal/edit/:id" element={<AppraisalForm />} />
          <Route path="appraisal/view/:id" element={<AppraisalView />} />

          {/* ================= RECRUITMENT ================= */}
          <Route path="recruitment" element={<Recruitment />} />
          <Route path="recruitment/designations" element={<Designations />} />
          <Route path="recruitment/view-by-role" element={<ViewByRole />} />
          <Route path="recruitment/create-login" element={<CreateLogin />} />
          <Route path="recruitment/internal-portal" element={<InternalPortal />} />

          {/* ⭐⭐⭐ FIXED — OFFER ROUTES */}
          <Route
            path="recruitment/offer-preview/:id"
            element={<OfferLetterPreview />}
          />
          <Route
            path="recruitment/offer-letter/:id"
            element={<OfferLetter />}
          />

          {/* APPLICATION LIST */}
          <Route path="view-applicants" element={<ViewApplications />} />

          {/* COMMON */}
          <Route path="timesheet" element={<Timesheet />} />
          <Route path="timesheet/history" element={<TimesheetHistory />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>

        {/* ================= EMPLOYEE DASHBOARD ================= */}
        <Route
          path="/employee-dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        >
          <Route index element={<EmployeeJobs />} />
          <Route path="employee-jobs" element={<EmployeeJobs />} />
          <Route path="my-applications" element={<ViewApplications />} />
          <Route path="my-offers" element={<EmployeeOffers />} />
          <Route path="leave-history" element={<EmployeeLeaveHistory />} />

          {/* Optional Edit */}
          <Route path="employee-details/edit/:id" element={<AddEmployee />} />

          {/* Appraisal */}
          <Route path="appraisal" element={<Appraisal />} />
          <Route path="appraisal/add" element={<AppraisalForm />} />
          <Route path="appraisal/edit/:id" element={<AppraisalForm />} />
          <Route path="appraisal/view/:id" element={<AppraisalView />} />

          {/* COMMON */}
          <Route path="timesheet" element={<Timesheet />} />
          <Route path="timesheet/history" element={<TimesheetHistory />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
