const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      max: 100,
    },
    desc: {
      type: String,
      max: 500,
    },
    email: {
      type: String,
      max: 20,
    },
    phone: {
      type: String,
      max: 20,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchema);
module.exports = Post;
