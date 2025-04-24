import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CreateTask.css"



function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    alert("task created");
    await axios.post(
      "http://localhost:5000/api/tasks",
      { title, description },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    navigate("/tasks");
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleCreate}>
        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Description and due date" onChange={(e) => setDescription(e.target.value)} required />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateTask;
