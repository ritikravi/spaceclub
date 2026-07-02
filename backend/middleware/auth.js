const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token. Access denied." });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "spaceclub_secret");
    req.admin = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token." });
  }
};
