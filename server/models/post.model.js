const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  comments: Array,
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
