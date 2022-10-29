const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    firstName: { type: String, max: 20 },
    lastName: { type: String, max: 20 },
    email: { type: String, required: true, unique: true },
    active: { type: Boolean, default: true },
    password: { type: String, required: true },
    otpToken: { type: String, default: null },
    otpTokenExpires: { type: Date, default: null },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    profilePic: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
    bio: { type: String, max: 50 },
    location: { type: String, max: 50 },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const User = mongoose.model("user", userSchema);
module.exports = User;

module.exports.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error("Hashing failed", error);
  }
};
