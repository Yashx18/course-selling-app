const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config.js");

// Admin Authentication
function adminAuth(req, res, next) {
  const token = req.headers.token;

  const decoded = jwt.verify(token, JWT_ADMIN_SECRET);

  if (decoded) {
    req.adminId = decoded.id;
    next();
  } else {
    res.status(403).json({
      message: "Token is Invalid.",
    });
  }
}

module.exports = {
  adminAuth,
};
