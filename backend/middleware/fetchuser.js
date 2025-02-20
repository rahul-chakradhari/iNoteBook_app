var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  const token = req.header("auth-token");
  console.log("Received Token:", token);
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" }); // ⬅️ Added return here
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" }); // ⬅️ Added return here
  }
};

module.exports = fetchuser;
