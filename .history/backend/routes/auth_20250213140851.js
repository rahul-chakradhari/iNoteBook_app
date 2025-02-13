// // Importing required modules
// const express = require("express");
// const { body, validationResult } = require("express-validator");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const fetchuser = require("../middleware/fetchuser");

// const router = express.Router();
// const JWT_SECRET = "password@123"; // Keep this in .env file in production

// // 🚀 Route 1: Create a user using: POST "api/auth/createuser". Doesn't require login
// router.post(
//   "/createuser",
//   [
//     body("email", "Enter a valid email").isEmail(),
//     body("name", "Name must be at least 5 characters").isLength({ min: 5 }),
//     body("password", "Password must be at least 8 characters").isLength({
//       min: 8,
//     }),
//   ],
//   async (req, res) => {
//     let success = false;

//     // Validate request body
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ success, errors: errors.array() });
//     }

//     try {
//       // Check if the user already exists
//       let user = await User.findOne({ email: req.body.email });

//       if (user) {
//         return res
//           .status(400)
//           .json({ success, error: "This email is already registered" });
//       }

//       // Hash the password
//       const salt = await bcrypt.genSalt(10);
//       const secured_pass = await bcrypt.hash(req.body.password, salt);

//       // Create new user
//       user = await User.create({
//         name: req.body.name,
//         password: secured_pass,
//         email: req.body.email,
//       });

//       // Generate JWT token
//       const data = {
//         user: {
//           id: user.id,
//         },
//       };
//       const authtoken = jwt.sign(data, JWT_SECRET);

//       success = true;
//       res.json(user);
//     } catch (err) {
//       console.error("Error in /createuser:", err);
//       res.status(500).json({ success: false, error: "Internal Server Error" });
//     }
//   }
// );

// // 🚀 Route 2: Authenticate a user using: POST "api/auth/login". Doesn't require login
// router.post(
//   "/login",
//   [
//     body("email", "Enter a valid email").isEmail(),
//     body("password", "Password cannot be blank").exists(),
//   ],
//   async (req, res) => {
//     let success = false;

//     // Validate request body
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ success, errors: errors.array() });
//     }

//     const { email, password } = req.body;

//     try {
//       // Check if user exists
//       let user = await User.findOne({ email });
//       if (!user) {
//         return res.status(400).json({ success, error: "Invalid credentials" });
//       }

//       // Compare password
//       const passwordCompare = await bcrypt.compare(password, user.password);
//       if (!passwordCompare) {
//         return res.status(400).json({ success, error: "Invalid credentials" });
//       }

//       // Generate JWT token
//       const data = {
//         user: {
//           id: user.id,
//         },
//       };
//       const authtoken = jwt.sign(data, JWT_SECRET);

//       success = true;
//       res.json({
//         success,
//         authtoken,
//         user: { name: user.name, email: user.email },
//       });
//     } catch (err) {
//       console.error("Error in /login:", err);
//       res.status(500).json({ success: false, error: "Internal Server Error" });
//     }
//   }
// );

// // 🚀 Route 3: Get logged-in user details using: POST "api/auth/getuser". Requires login
// router.post("/getuser", fetchuser, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const user = await User.findById(userId).select("-password"); // Exclude password
//     res.json({ success: true, user });
//   } catch (err) {
//     console.error("Error in /getuser:", err);
//     res.status(500).json({ success: false, error: "Internal Server Error" });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  console.log(req.body);
});
module.exports = router;
