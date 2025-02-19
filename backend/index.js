require("dotenv").config();
const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000; // ✅ Render assigns a dynamic port

console.log("MongoDB URI:", process.env.MONGO_URI);
console.log("🔄 Server will listen on port:", PORT);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("iNotebook Backend is Running Successfully! 🚀");
});

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/sugg", require("./routes/sugg"));

// ✅ Ensure app listens on process.env.PORT
app.listen(PORT, () => {
  console.log(`✅ iNotebook backend listening on port ${PORT}`);
});
