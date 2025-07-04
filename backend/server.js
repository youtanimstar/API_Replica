// Initialize Express app
const express = require('express');
const app = express();
app.use(express.json());


// Middleware for CORS
const cors = require('cors');
app.use(cors());

// Load environment variables from .env file
const dotenv = require('dotenv');
dotenv.config();

// Import database configuration
const db = require('./config/db');


// Set up the port and backend URL
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || `http://localhost:${PORT}`;

// Import routes
const apiRoutes = require('./routes/apiRoutes');
const customRoutes = require('./routes/customRoutes');




app.get("/", (req, res) => {
  res.send("Welcome to the backend server of API REPLICA!");
}
);


// Sample route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.use('/v1', apiRoutes);
app.use('/custom', customRoutes);




app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}, Link ${BACKEND_URL}`);
});