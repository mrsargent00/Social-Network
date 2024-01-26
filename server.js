// Importing necessary modules
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Creating an Express app
const app = express();
const PORT = process.env.PORT || 3000; // Setting the port, default to 3000 if not provided in environment

// Using middleware to handle JSON and form data, and setting up routes
app.use(express.json(), express.urlencoded({ extended: true }), routes);

// Once the database connection is open, start the server
db.once('open', () => app.listen(PORT, () => console.log(`API server running on port ${PORT}!`)));
