import React,
{
  useEffect,
  useState
}
from "react";

import
{
  useNavigate,
  useParams
}
from "react-router-dom";

import "./AppraisalForm.css";

export default function AppraisalForm()
{

  const navigate = useNavigate();

  const { id } = useParams();


  /* ======================
     AUTH
  ====================== */

  const loggedUser =
    JSON.parse(
      localStorage.getItem("loggedInUser")
    ) || {};

  const token =
    localStorage.getItem("token");

  const role =
    loggedUser?.role?.toUpperCase();

  const base =
    role === "ADMIN"
      ? "/admin-dashboard"
      : "/employee-dashboard";


  /* ======================
     STATE
  ====================== */

  const [employees, setEmployees] =
    useState([]);

  const [loadingEmployees, setLoadingEmployees] =
    useState(true);

  const [loadingAppraisal, setLoadingAppraisal] =
    useState(true);

  const [formData, setFormData] =
    useState({

      employeeName: "",

      department: "",

      period: "Jan 2024 - Dec 2024",

      rating: "",

      status: "Pending"

    });

  const [errors, setErrors] =
    useState({});


  /* ======================
     SAFE NAME BUILDER
  ====================== */

  const getEmployeeName =
    (emp) =>
    {

      if (!emp) return "";

      if (emp.firstName || emp.lastName)
        return `${emp.firstName || ""} ${emp.lastName || ""}`.trim();

      if (emp.name)
        return emp.name;

      if (emp.email)
        return emp.email.split("@")[0];

      return "Employee";

    };


  /* ======================
     LOAD EMPLOYEES
     FIXED ROOT CAUSE HERE
  ====================== */

  useEffect(() =>
  {

    const loadEmployees =
      async () =>
      {

        try
        {

          if (!token)
          {
            console.error("Token missing");
            setEmployees([]);
            return;
          }

          /* ALWAYS use working endpoint */
          const res =
            await fetch(
              "http://localhost:8080/api/profile",
              {
                headers:
                {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            );

          if (!res.ok)
            throw new Error("Failed to load employees");

          const data =
            await res.json();

          console.log("Employees loaded:", data);

          /* Ensure array format */
          const employeeArray =
            Array.isArray(data)
              ? data
              : [data];

          setEmployees(employeeArray);

        }
        catch (err)
        {

          console.error(
            "Employee load error:",
            err
          );

          setEmployees([]);

        }
        finally
        {

          setLoadingEmployees(false);

        }

      };

    loadEmployees();

  }, [token]);


  /* ======================
     LOAD APPRAISAL
  ====================== */

  useEffect(() =>
  {

    if (!id)
    {
      setLoadingAppraisal(false);
      return;
    }

    const loadAppraisal =
      async () =>
      {

        try
        {

          const res =
            await fetch(
              `http://localhost:8080/api/appraisals/${id}`,
              {
                headers:
                {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            );

          if (!res.ok)
            throw new Error("Failed to load appraisal");

          const data =
            await res.json();

          setFormData(
          {
            employeeName:
              data.employeeName || "",

            department:
              data.department || "",

            period:
              data.reviewPeriod || "",

            rating:
              data.rating || "",

            status:
              data.status || "Pending"
          });

        }
        catch (err)
        {

          console.error(
            "Appraisal load error:",
            err
          );

        }
        finally
        {

          setLoadingAppraisal(false);

        }

      };

    loadAppraisal();

  }, [id, token]);


  /* ======================
     HANDLE CHANGE
  ====================== */

  const handleChange =
    (e) =>
    {

      const { name, value } =
        e.target;

      if (name === "employeeName")
      {

        const emp =
          employees.find(
            e =>
              getEmployeeName(e) === value
          );

        setFormData(
        {
          ...formData,

          employeeName: value,

          department:
            emp?.department || ""
        });

        return;

      }

      setFormData(
      {
        ...formData,

        [name]: value
      });

    };


  /* ======================
     VALIDATION
  ====================== */

  const validate =
    () =>
    {

      let temp = {};

      if (!formData.employeeName)
        temp.employeeName = "Required";

      if (!formData.rating)
        temp.rating = "Required";

      setErrors(temp);

      return Object.keys(temp).length === 0;

    };


  /* ======================
     SUBMIT
  ====================== */

  const handleSubmit =
    async (e) =>
    {

      e.preventDefault();

      if (!validate())
        return;

      try
      {

        const method =
          id ? "PUT" : "POST";

        const url =
          id
            ? `http://localhost:8080/api/appraisals/${id}`
            : `http://localhost:8080/api/appraisals`;

        const res =
          await fetch(
            url,
            {
              method,

              headers:
              {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`
              },

              body:
                JSON.stringify(
                {
                  employeeName:
                    formData.employeeName,

                  department:
                    formData.department,

                  reviewPeriod:
                    formData.period,

                  rating:
                    parseFloat(formData.rating),

                  status:
                    formData.status,

                  remarks: "",

                  salaryIncrease: 0
                })
            }
          );

        if (!res.ok)
          throw new Error();

        alert("Saved successfully");

        navigate(
          `${base}/appraisal`
        );

      }
      catch (err)
      {

        console.error(err);

        alert("Save failed");

      }

    };


  /* ======================
     LOADING GUARD
  ====================== */

  if (loadingEmployees || loadingAppraisal)
  {
    return (
      <div style={{ padding: "40px" }}>
        Loading...
      </div>
    );
  }


  /* ======================
     UI
  ====================== */

  return (

    <div className="appraisal-form-scope">

      <div className="appraisal-form-card">

        <h2>
          {
            id
              ? "Edit Employee Appraisal"
              : "Add Employee Appraisal"
          }
        </h2>

        <form
          className="appraisal-form"
          onSubmit={handleSubmit}
        >

          <label>Employee</label>

          <select
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
          >

            <option value="">
              Select Employee
            </option>

            {
              employees.map(emp =>
              {
                const name =
                  getEmployeeName(emp);

                return (
                  <option
                    key={emp.id || emp.email}
                    value={name}
                  >
                    {name}
                  </option>
                );
              })
            }

          </select>


          <label>Department</label>

          <input
            value={formData.department}
            disabled
          />


          <label>Period</label>

          <input
            name="period"
            value={formData.period}
            onChange={handleChange}
          />


          <label>Rating</label>

          <input
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          />


          <label>Status</label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
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


          <button type="submit">
            Save
          </button>

        </form>

      </div>

    </div>

  );

}