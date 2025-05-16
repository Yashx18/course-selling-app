const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
mongoose.connect(
  "mongodb+srv://Ken:%40Y2a0s0h4@cluster0.rrelns0.mongodb.net/coursera-app"
);

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});
const adminSchema = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
});
const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  creator: ObjectId,
});
const purchaseSchema = new Schema({
  courseId: ObjectId,
  userId: ObjectId,
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel,
};
