const express = require('express');
const connectDB = require('./config');
require('dotenv').config();

// ROUTES IMPORT 
const authRoutes = require("./routes/authroutes"); 
const resourceRoutes = require("./routes/resource");
const authMiddleware = require("./middleware/auth");

const app = express();
const PORT = 5000;

// Connect DB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resources", authMiddleware, resourceRoutes);

// Main route
app.get('/', (req, res) => {
    res.send("Backend is working 🚀. Server + MongoDB connected successfully.");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
