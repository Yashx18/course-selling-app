const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");

const { JWT_ADMIN_SECRET } = require("../auth.js");

// SignUp Schema
const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(3),
  lastName: z.string().min(2),
});

// LogIn Schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// SignIn Route
adminRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body;
  const parsed = signupSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      message: "Incorrect Data Format.",
    });
    return;
  }

  const existingadmin = await adminModel.findOne({
    email,
  });
  if (existingadmin) {
    res.json({
      message: "Email already in use.",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  await adminModel.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });
  res.json({
    message: "Signed in Successfully.",
  });
});

// Login Route
adminRouter.post("/login", async function (req, res) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.json({
      message: "Invalid Data Format.",
    });
    return;
  }
  const { email, password } = req.body;

  const admin = await adminModel.findOne({ email });

  if (!admin) {
    res.json({
      message: "admin not found.",
    });
    return;
  }

  const isValidPassword = await bcrypt.compare(password, admin.password);

  if ((isValidPassword, admin)) {
    const token = jwt.sign(
      {
        id: admin._id,
      },
      JWT_ADMIN_SECRET
    );
    res.json({
      message: "Login Succesfully",
      token: token,
    });
  }
});

adminRouter.post("/create-course", function (req, res) {});

adminRouter.post("/delete-course", function (req, res) {});

adminRouter.post("/course-content", function (req, res) {});

module.exports = {
  adminRouter: adminRouter,
};
