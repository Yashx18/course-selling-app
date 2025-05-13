const { Router } = require("express");
const courseRouter = Router();

courseRouter.get("/purchase", function (req, res) { });

courseRouter.post("/preview", function (req, res) { });


module.exports = {
  courseRouter: courseRouter,
};
