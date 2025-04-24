const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a Task
router.post("/", authMiddleware, async (req, res) => {
  const { title } = req.body;

  try {
    const task = new Task({ userId: req.user.id, title });
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task!" });
  }
});

// Get Tasks for a User
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks!" });
  }
});

// Update Task (Mark as Completed)


router.put("/:id", authMiddleware, async (req, res) => {
    try {
      // Find the task by ID and update it with new values
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id, // Get the task ID from URL
        { $set: req.body }, // Update all fields in the request body
        { new: true, runValidators: true } // Return updated task & apply validation
      );
  
      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found!" });
      }
  
      res.json(updatedTask); // Send back updated task
    } catch (error) {
      res.status(500).json({ error: "Failed to update task!" });
    }
  });
  

// Delete Task
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task!" });
  }
});

module.exports = router;
