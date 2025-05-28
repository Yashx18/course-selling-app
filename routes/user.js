// const express = require("express");
// const Router = express.Router();

const { Router } = require("express");
const userRouter = Router();
const { userModel, courseModel, purchaseModel } = require("../db.js");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_USER_SECRET } = require("../config.js");
const { userAuth } = require("../middlewares/userM.js");

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

userRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body;
  const parsed = signupSchema.safeParse(req.body);

  if (!parsed.success) {
    res.json({
      message: "Invalid Data Format.",
    });
    return;
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    res.json({
      message: "Signed Up Successfully.",
    });
  }
});

// Login Route
userRouter.post("/login", async function (req, res) {
  const { email, password } = req.body;

  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.json({
      message: "Invalid Data Format.",
    });
    return;
  }
  const user = await userModel.findOne({
    email,
  });
  if (!user) {
    res.json({
      message: "User not found.",
    });
    return;
  }
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (user && isValidPassword) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_USER_SECRET
    );

    res.json({
      message: "Signed In Successfully.",
      token: token,
    });
  }
});

// My Purchases Route
userRouter.get("/purchases", userAuth, async function (req, res) {
  const userId = req.userId;

  const purchases = await purchaseModel.find({
    userId,
  });

  res.json({
    courses: purchases,
  });
});

module.exports = {
  userRouter: userRouter,
};
