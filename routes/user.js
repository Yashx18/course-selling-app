// const express = require("express");
// const Router = express.Router();

const { Router } = require("express");
const userRouter = Router();
const {userModel} = require('../db.js')

userRouter.post("/signup", function (req, res) {});

userRouter.post("/login", function (req, res) {});

userRouter.get("/purchases", function (req, res) {
  res.send({
    message: "Working!!",
  });
});

module.exports = {
  userRouter: userRouter,
};
