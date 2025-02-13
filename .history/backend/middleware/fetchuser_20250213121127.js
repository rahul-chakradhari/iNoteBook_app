const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "password@123";

const fetchuser = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // Verify token and extract user data
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    console.log("Decoded user:", req.user); // Debugging line
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Invalid token:", error); // Debugging line
    return res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = fetchuser;
