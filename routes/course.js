const { Router } = require("express");
const courseRouter = Router();
const { courseModel } = require("../db.js");
const { purchaseModel } = require("../db.js");
const { userAuth } = require("../middlewares/userM.js");

courseRouter.post("/purchase", userAuth, async function (req, res) {
  const userId = req.userId;
  const courseId = req.body.courseId;

  if (!courseId || !userId) {
    return res.status(400).json({ error: "courseId and userId are required" });
  }

  try {
    await purchaseModel.create({ courseId, userId });
    const course = await courseModel.findOne({
      _id: courseId,
    });
    res.json({
      message: "Course bought successfully.",
      course,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to purchase course." });
  }
});

courseRouter.get("/preview", async function (req, res) {
  try {
    const courses = await courseModel.find({});
    res.json({ courses });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch courses." });
  }
});

module.exports = {
  courseRouter,
};
