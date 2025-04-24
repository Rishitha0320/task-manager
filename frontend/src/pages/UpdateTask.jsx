import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateTask() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const res = await axios.get(`http://localhost:5000/api/tasks/${id}`);
      setTitle(res.data.title);
      setDescription(res.data.description);
    };
    fetchTask();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    alert("task updated");
    await axios.put(
      `http://localhost:5000/api/tasks/${id}`,
      { title, description },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    navigate("/tasks");
  };

  return (
    <div>
      <h2>Update Task</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" placeholder="updted task" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateTask;
