const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "password@123"; // Store secret in env for better security

const fetchuser = (req, res, next) => {
  // Extract token from Authorization header: "Bearer <token>"
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // Verify token and extract user data
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = fetchuser;
