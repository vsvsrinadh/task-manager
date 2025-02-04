const mongoose = require('mongoose');

// Define the task schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
});

// Create and export the model
module.exports = mongoose.model('Task', taskSchema);
