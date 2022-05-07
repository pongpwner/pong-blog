const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userName: String,
  postId: String,
  content: String,
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
