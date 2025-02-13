const express = require("express");
const connectToMongo = require("./db");
const cors = require("cors");

const app = express();
const port = 5000;

// Connect to MongoDB
connectToMongo();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON data

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/suggestions", require("./routes/suggestions"));

// Home route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).send("Something went wrong!");
});

// Start server
app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`);
});
