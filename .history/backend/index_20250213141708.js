const connectToMongo = require("./db");
const express = require("express");

//const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
//app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON data

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
//app.use("/api/suggestions", require("./routes/suggestions"));

// Home route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`);
});
connectToMongo();
