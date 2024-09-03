// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');
const apiRoutes = require('./routes/api');
const { startPriceScheduler } = require('./utils/scheduler');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Mount API routes
app.use('/api', apiRoutes);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the Ethereum price scheduler
startPriceScheduler();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});