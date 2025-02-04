const express = require('express');
const router = express.Router();
const Task = require('../models/task'); // Import Task model

// POST /api/tasks – Create a new task
router.post('/tasks', async (req, res) => {
  const { title, description, status } = req.body;

  // Validate status
  if (status && !['pending', 'completed'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const newTask = new Task({ title, description, status: status || 'pending' });
await newTask.save();
console.log('New Task:', newTask);  // Log the task to verify its content
// res.status(201).json(newTask); // Respond with the created task //...this is error for getting 201
res.status(200).json(newTask);  //corrected to



  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/tasks – Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find(); // Fetch all tasks from the database
    res.status(200).json(tasks); // Send the tasks as the response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/tasks/:id – Update a task
router.put('/tasks/:id', async (req, res) => {
  const { title, description, status } = req.body;
  



  // Validate status
  if (status && !['pending', 'completed'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id, // Find task by ID
      { title, description, status }, // Updated data
      { new: true } // Return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(updatedTask); // Respond with the updated task
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/tasks/:id – Delete a task
router.delete('/tasks/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id); // Delete task by ID

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' }); // Success message
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
