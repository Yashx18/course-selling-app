const { Router } = require("express");
const adminRouter = Router();

adminRouter.post("/signup", function (req, res) {});

adminRouter.post("/login", function (req, res) {});

adminRouter.post("/create-course", function (req, res) {});

adminRouter.post("/delete-course", function (req, res) {});

adminRouter.post("/course-content", function (req, res) {});

module.exports = {
  adminRouter: adminRouter,
};
