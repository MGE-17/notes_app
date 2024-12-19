import express from "express";
import cors from "cors";
import bodyParser from "body-parser";  // Optional if you're using express.json()
import notesRouter from "./routes/notes.js"; // Ensure the path is correct

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // Built-in middleware to parse JSON bodies

// Routes
app.use("/notes", notesRouter); // This tells Express to use the /notes route

// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the Notes API");
});

// Start the server
app.listen(8686, () => {
  console.log(`Server running on http://localhost:8686`);
});
