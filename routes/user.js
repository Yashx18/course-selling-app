// const express = require("express");
// const Router = express.Router();

const { Router } = require("express");
const userRouter = Router();

userRouter.post("/signup", function (req, res) {});

userRouter.post("/login", function (req, res) {});

userRouter.get("/purchases", function (req, res) { });


module.exports = {
  userRouter: userRouters,
};
