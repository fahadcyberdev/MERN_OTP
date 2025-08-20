import express from "express"; // Import Express framework
import dotenv from "dotenv"; // Import dotenv to use environment variables from .env file
import cors from "cors"; // Import CORS to allow cross-origin requests
import connectDB from "./config/db.js"; // Import function to connect to MongoDB
import authRoutes from "./routes/authRoutes.js"; // Import authentication routes

dotenv.config(); // Load environment variables from .env file
connectDB(); // Connect to MongoDB database

const app = express(); // Create an Express application

app.use(express.json()); // Middleware to parse JSON data from requests
app.use(cors()); // Middleware to enable CORS (allow requests from other domains)

// Routes
app.use("/api/auth", authRoutes); // All authentication routes will start with /api/auth

// Default route for checking if API is running
app.get("/", (req, res) => {
  res.send("API is running"); // Sends a simple message when you visit the root URL
});

// Set the port from environment variable or use 5000 as default
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
