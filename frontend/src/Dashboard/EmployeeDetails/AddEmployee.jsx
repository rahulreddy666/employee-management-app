import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EmployeeForm.css";

function AddEmployee() {

  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [activeTab,setActiveTab] = useState("personal");

  const [employee,setEmployee] = useState({
    firstName:"",
    lastName:"",
    empId:"",
    gender:"",
    dob:"",
    maritalStatus:"",
    email:"",
    aadhar:"",
    pan:"",
    designation:"",
    department:"",
    salary:"",
    role:"",
    skills:[],
    tempSkill:"",
    customSkill:"",
    bankName:"",
    accountNumber:"",
    ifsc:"",
    qualification:"",
    university:"",
    passingYear:""
  });

  const skillOptions=[
    "C","C++","Java","Advanced Java","Python",
    "NodeJS","React","Angular","MongoDB"
  ];

  const [designations,setDesignations]=useState([]);

  /* LOAD DESIGNATIONS */
  useEffect(()=>{
    const saved=JSON.parse(localStorage.getItem("designations"))||[];
    setDesignations(saved);
  },[]);

  /* LOAD EMPLOYEE FOR EDIT */
  useEffect(()=>{
    if(!isEditMode) return;

    const load = async()=>{
      try{
        const token = localStorage.getItem("token");

        const res = await fetch(
          `http://localhost:8080/api/profile/${id}`,
          { headers:{ Authorization:`Bearer ${token}` } }
        );

        const data = await res.json();

        setEmployee(prev=>({
          ...prev,
          ...data,
          skills:data.skills ? data.skills.split(",") : []
        }));

      }catch(err){
        console.error(err);
      }
    };

    load();
  },[id,isEditMode]);

  /* INPUT */
  const handleChange=(e)=>{
    const {name,value}=e.target;

    if(name==="pan"){
      setEmployee({...employee,pan:value.toUpperCase()});
      return;
    }

    setEmployee({...employee,[name]:value});
  };

  /* SKILLS */
  const addSkill=()=>{
    let s = employee.tempSkill==="Other"
      ? employee.customSkill.trim()
      : employee.tempSkill;

    if(!s) return;

    if(!employee.skills.includes(s)){
      setEmployee(prev=>({
        ...prev,
        skills:[...prev.skills,s],
        tempSkill:"",
        customSkill:""
      }));
    }
  };

  const removeSkill=(skill)=>{
    setEmployee(prev=>({
      ...prev,
      skills:prev.skills.filter(s=>s!==skill)
    }));
  };

  /* SAVE */
  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{
      const token = localStorage.getItem("token");

      const payload={
        ...employee,
        skills:employee.skills.join(",")
      };

      const url=isEditMode
        ? `http://localhost:8080/api/profile/${id}`
        : `http://localhost:8080/api/profile`;

      const method=isEditMode?"PUT":"POST";

      const res=await fetch(url,{
        method,
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(payload)
      });

      if(!res.ok) throw new Error();

      alert(isEditMode?"Updated Successfully":"Employee Created");

      /* ⭐ refresh list correctly */
      navigate("/admin-dashboard/employee-details",{replace:true});
      setTimeout(()=>window.location.reload(),100);

    }catch(err){
      console.error(err);
      alert("Save Failed");
    }
  };

  const Field=(label,el)=>(
    <div className="form-field">
      <label>{label}</label>
      {el}
    </div>
  );

  return (
    <div className="add-employee-page">

      <h2>{isEditMode?"Edit Employee":"Add Employee"}</h2>

      <div className="tabs">
        {["personal","employment","bank","education"].map(t=>(
          <button
            key={t}
            type="button"
            className={`tab ${activeTab===t?"active":""}`}
            onClick={()=>setActiveTab(t)}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      <form className="employee-form" onSubmit={handleSubmit}>

{/* ================= PERSONAL ================= */}
{activeTab==="personal" && (
<>
<h3>Personal Details</h3>
<div className="employee-grid">

{Field("First Name",
<input name="firstName" value={employee.firstName} onChange={handleChange}/>
)}

{Field("Last Name",
<input name="lastName" value={employee.lastName} onChange={handleChange}/>
)}

{Field("Employee ID",
<input name="empId" value={employee.empId} onChange={handleChange}/>
)}

{Field("Gender",
<select name="gender" value={employee.gender} onChange={handleChange}>
<option value="">Select</option>
<option>Male</option>
<option>Female</option>
</select>
)}

{Field("DOB",
<input type="date" name="dob" value={employee.dob} onChange={handleChange}/>
)}

{Field("Marital",
<select name="maritalStatus" value={employee.maritalStatus} onChange={handleChange}>
<option value="">Select</option>
<option>Single</option>
<option>Married</option>
</select>
)}

{Field("Email",
<input name="email" value={employee.email} onChange={handleChange}/>
)}

{Field("Aadhar",
<input name="aadhar" value={employee.aadhar} onChange={handleChange}/>
)}

{Field("PAN",
<input name="pan" value={employee.pan} onChange={handleChange}/>
)}

</div>
</>
)}

{/* ================= EMPLOYMENT ================= */}
{activeTab==="employment" && (
<>
<h3>Employment Details</h3>
<div className="employee-grid">

{Field("Designation",
<select
  name="designation"
  value={employee.designation || ""}
  onChange={handleChange}
>
  <option value="">Select</option>
  {designations.map(d => (
    <option key={d.id} value={d.title}>
      {d.title}
    </option>
  ))}
</select>
)}

{Field("Salary",
<input name="salary" value={employee.salary} onChange={handleChange}/>
)}

{Field("Department",
<select name="department" value={employee.department} onChange={handleChange}>
<option value="">Select</option>
<option>Frontend</option>
<option>Backend</option>
<option>HR</option>
</select>
)}

{Field("Role",
<select name="role" value={employee.role} onChange={handleChange}>
<option value="">Select</option>
<option>Employee</option>
<option>Admin</option>
</select>
)}

{Field("Skill",
<select name="tempSkill" value={employee.tempSkill} onChange={handleChange}>
<option value="">Select</option>
{skillOptions.map(s=><option key={s}>{s}</option>)}
<option>Other</option>
</select>
)}

<button type="button" onClick={addSkill}>Add Skill</button>

<div>
{employee.skills.map(s=>(
<span key={s} onClick={()=>removeSkill(s)} className="skill-chip">
{s} ✖
</span>
))}
</div>

</div>
</>
)}

{/* ================= BANK ================= */}
{activeTab==="bank" && (
<>
<h3>Bank Details</h3>
<div className="employee-grid">
{Field("Bank",
<input name="bankName" value={employee.bankName} onChange={handleChange}/>
)}
{Field("Account",
<input name="accountNumber" value={employee.accountNumber} onChange={handleChange}/>
)}
{Field("IFSC",
<input name="ifsc" value={employee.ifsc} onChange={handleChange}/>
)}
</div>
</>
)}

{/* ================= EDUCATION ================= */}
{activeTab==="education" && (
<>
<h3>Education Details</h3>
<div className="employee-grid">
{Field("Qualification",
<input name="qualification" value={employee.qualification} onChange={handleChange}/>
)}
{Field("University",
<input name="university" value={employee.university} onChange={handleChange}/>
)}
{Field("Year",
<input name="passingYear" value={employee.passingYear} onChange={handleChange}/>
)}
</div>
</>
)}

<button className="save-btn" type="submit">
{isEditMode?"Update Employee":"Save Employee"}
</button>

      </form>
    </div>
  );
}

export default AddEmployee;
