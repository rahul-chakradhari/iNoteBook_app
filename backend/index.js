const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

connectToMongo();
const app = express();
const port = process.env.PORT || 5000; // Render ke liye dynamic port

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("iNotebook Backend is Running Successfully! 🚀");
});

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/sugg", require("./routes/sugg"));

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`);
});
