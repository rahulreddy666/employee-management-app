import { useState, useEffect } from "react";
import "./Recruitment.css";
import "./Designations.css";

function Designations()
{
  const [title, setTitle] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:8080/api/designations";


  /* =========================================================
     LOAD DESIGNATIONS FROM BACKEND
  ========================================================= */
  const loadDesignations = async () =>
  {
    try
    {
      const token = localStorage.getItem("token");

      const response = await fetch(API_URL,
      {
        method: "GET",
        headers:
        {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok)
        throw new Error("Failed to fetch designations");

      const data = await response.json();

      console.log("Designations loaded:", data);

      setList(data);
    }
    catch (error)
    {
      console.error(error);
      alert("Error loading designations");
    }
  };


  /* =========================================================
     LOAD ON PAGE OPEN
  ========================================================= */
  useEffect(() =>
  {
    loadDesignations();
  }, []);



  /* =========================================================
     CREATE DESIGNATION
  ========================================================= */
  const handleCreate = async () =>
  {
    if (!title.trim())
      return alert("Please enter designation");

    try
    {
      const token = localStorage.getItem("token");

      const response = await fetch(API_URL,
      {
        method: "POST",
        headers:
        {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ title })
      });

      if (!response.ok)
        throw new Error("Failed to create designation");

      setTitle("");

      loadDesignations();
    }
    catch (error)
    {
      alert(error.message);
    }
  };



  /* =========================================================
     DELETE DESIGNATION
  ========================================================= */
  const handleDelete = async (id) =>
  {
    if (!window.confirm("Are you sure you want to delete this role?"))
      return;

    try
    {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/${id}`,
      {
        method: "DELETE",
        headers:
        {
          "Authorization": "Bearer " + token
        }
      });

      if (!response.ok)
        throw new Error("Failed to delete designation");

      loadDesignations();
    }
    catch (error)
    {
      alert(error.message);
    }
  };



  /* =========================================================
     EDIT MODE
  ========================================================= */
  const handleEdit = (designation) =>
  {
    setIsEditing(true);
    setEditId(designation.id);
    setTitle(designation.title);
  };



  /* =========================================================
     UPDATE DESIGNATION
  ========================================================= */
  const handleUpdate = async () =>
  {
    if (!title.trim())
      return alert("Please enter designation");

    try
    {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/${editId}`,
      {
        method: "PUT",
        headers:
        {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ title })
      });

      if (!response.ok)
        throw new Error("Failed to update designation");

      setIsEditing(false);
      setEditId(null);
      setTitle("");

      loadDesignations();
    }
    catch (error)
    {
      alert(error.message);
    }
  };



  /* =========================================================
     CANCEL EDIT
  ========================================================= */
  const cancelEdit = () =>
  {
    setIsEditing(false);
    setEditId(null);
    setTitle("");
  };



  /* =========================================================
     UI
  ========================================================= */
  return (
    <div className="designation-isolated">

      <div className="designation-page">

        <h2>Generate Employee Designation</h2>

        <div className="designation-form-card">

          <div className="designation-form-row">

            <input
              type="text"
              placeholder="Enter Designation e.g. Manager"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="designation-input"
            />

            {!isEditing ?
            (
              <button
                type="button"
                onClick={handleCreate}
                className="designation-create-btn"
              >
                Create
              </button>
            )
            :
            (
              <div className="designation-edit-actions">

                <button
                  type="button"
                  onClick={handleUpdate}
                  className="designation-update-btn"
                >
                  Update
                </button>

                <button
                  type="button"
                  onClick={cancelEdit}
                  className="designation-cancel-btn"
                >
                  Cancel
                </button>

              </div>
            )}

          </div>

        </div>



        <div className="designation-table-card">

          <table className="designation-table">

            <thead>
              <tr>
                <th>S.No</th>
                <th>Designation Title</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {list.length === 0 ?
              (
                <tr>
                  <td colSpan="3" className="no-data">
                    No Designations Created Yet
                  </td>
                </tr>
              )
              :
              (
                list.map((d, index) =>
                (
                  <tr key={d.id}>
                    <td>{index + 1}</td>
                    <td>{d.title}</td>
                    <td className="action-cell">

                      <button
                        type="button"
                        className="edit-btn"
                        onClick={() => handleEdit(d)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => handleDelete(d.id)}
                      >
                        Delete
                      </button>

                    </td>
                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Designations;