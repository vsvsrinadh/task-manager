const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes'); 


const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(bodyParser.json()); // Parses JSON requests

/// Home route to display welcome message
app.get('/', (req, res) => {
  res.status(200).send('Hello everyone, welcome to my website');
});

// Register the task routes under the /api path
app.use('/api', taskRoutes);

//i removed mongodb connection url from here and placed in .env to keep it secret
require('dotenv').config(); // Make sure this is at the top of your file
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Start the server
const port = process.env.PORT || 5000; // Use environment variable for port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
