const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" }).end();
  }

  const token = authHeader.substring(7);

  try {
    const decodedAccessToken = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decodedAccessToken._id);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" }).end();
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.error("JWT token expired:", error.message);
      return res
        .status(401)
        .json({ error: true, message: "Token expired" })
        .end();
    } else if (error.name === "JsonWebTokenError") {
      console.error("Invalid JWT token:", error.message);
      return res
        .status(401)
        .json({ error: true, message: "Invalid token" })
        .end();
    } else {
      console.error("Error verifying JWT token:", error.message);
      return res
        .status(500)
        .json({ error: true, message: "Internal server error" })
        .end();
    }
  }
};

module.exports = authMiddleware;
