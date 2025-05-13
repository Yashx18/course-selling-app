const express = require("express");
const jwt = require("jsonwebtoken");
const { userRouter } = require("./routes/user.js");
const { courseRouter } = require("./routes/course.js");

const app = express();
const port = 3000;
app.use(express.json());

// Router for Users.
app.use("/user", userRouter);

// Router for Courses.
app.use("/course", courseRouter);

// USER SECTION

// ADMIN SECTION
// app.post("/admin/signup", function (req, res) {});
// app.post("/admin/login", function (req, res) {});
// app.post("/admin/create-course", function (req, res) {});
// app.post("/admin/delete-course", function (req, res) {});
// app.post("/admin/course-content", function (req, res) {});

// app.listen(port, (req, res) => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
