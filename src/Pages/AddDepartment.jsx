import { useState } from "react";
import api from "../api/axios";

function AddDepartment() {
  const [dept, setDept] = useState({ dept_name: "", description: "" });

  const handleChange = (e) =>
    setDept({ ...dept, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/add-department", dept);
      alert("Department added successfully");
    } catch {
      alert("Error adding department");
    }
  };

  return (
    <div className="card p-4 col-md-6 mt-16 mx-auto">
      <h3>Add Department</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-3" name="dept_name" placeholder="Department Name" onChange={handleChange} />
        <textarea className="form-control mb-3" name="description" placeholder="Description" onChange={handleChange} />
        <button className="btn btn-primary w-100">Add</button>
      </form>
    </div>
  );
}

export default AddDepartment;
