
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    };
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    const token = localStorage.getItem("token");
    alert("task deleted");
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(tasks.filter((task) => task._id !== id));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Task List</h2>
      <Link to="/create" style={styles.createButton}>+ Create Task</Link>

      <div style={styles.taskList}>
        {tasks.length === 0 ? (
          <p style={styles.noTaskMessage}>No tasks available.</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} style={styles.taskItem}>
              <h3 style={styles.taskTitle}>{task.title}</h3>
              <p style={styles.taskDescription}>{task.description}</p>
              <div style={styles.taskActions}>
                <Link to={`/update/${task._id}`} style={styles.editButton}>Edit</Link>
                <button onClick={() => deleteTask(task._id)} style={styles.deleteButton}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    background: "#F4F4F9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  heading: {
    color: "#333",
  },
  createButton: {
    display: "block",
    width: "100%",
    backgroundColor: "#4169E1",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    textDecoration: "none",
    fontWeight: "bold",
    marginBottom: "20px",
    transition: "0.3s",
    textAlign: "center",
  },
  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  taskItem: {
    background: "#FFFFFF",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
  },
  taskTitle: {
    marginBottom: "5px",
    color: "#222",
  },
  taskDescription: {
    color: "#555",
    marginBottom: "10px",
  },
  taskActions: {
    display: "flex",
    justifyContent: "space-between",
  },
  // editButton: {
  //   padding: "8px 12px",
  //   borderRadius: "5px",
  //   backgroundColor: "#34D399",
  //   color: "white",
  //   textDecoration: "none",
  //   transition: "0.3s",
  // },
  // deleteButton: {
  //   padding: "8px 12px",
  //   borderRadius: "5px",
  //   backgroundColor: "#F87171",
  //   color: "white",
  //   // border: "none",
  //   // cursor: "pointer",
  //   transition: "0.3s",
  // },
  editButton: {
    padding: "8px 12px",
    borderRadius: "5px",
    backgroundColor: "#34D399",
    color: "white",
    textDecoration: "none",
    transition: "0.3s",
    minWidth: "80px",
    textAlign: "center",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  deleteButton: {
    padding: "8px 12px",
    borderRadius: "5px",
    backgroundColor: "#F87171",
    color: "white",
    transition: "0.3s",
    minWidth: "80px",
    textAlign: "center",
    fontSize: "14px",
    boxSizing: "border-box",
  },

  noTaskMessage: {
    color: "#666",
    fontStyle: "italic",
  },
};

export default TaskList;
