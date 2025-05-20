const jwt = require("jsonwebtoken");
const JWT_ADMIN_SECRET = "kenx2004";
const JWT_USER_SECRET = "yashx2004";

// User Authentication
function userAuth(req, res, next) {}

// Admin Authentication
function adminAuth(req, res, next) {}

module.exports = {
  JWT_ADMIN_SECRET,
  JWT_USER_SECRET,
};
