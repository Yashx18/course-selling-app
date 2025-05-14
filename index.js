const express = require("express");
const jwt = require("jsonwebtoken");
const { userRouter } = require("./routes/user.js");
const { courseRouter } = require("./routes/course.js");
const { adminRouter } = require("./routes/admin.js");

const app = express();
const port = 3000;
app.use(express.json());

// Router for Users.
app.use("/user", userRouter);

// Router for Courses.
app.use("/course", courseRouter);

// Router for Admin.
app.use("/admin", adminRouter);

app.listen(port, (req, res) => {
  console.log(`Server is running on http://localhost:${port}`);
});
