const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/pongBlogDB");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const postSchema = mongoose.Schema({
  title: String,
  content: String,
});

const Post = mongoose.model("post", postSchema);

///
// app.get("/", function (req, res) {
//   Post.find({}, function (err, posts) {
//     res.json({ posts: posts });
//   });
// });

app.get("/posts", function (req, res, next) {
  Post.find({}, function (err, posts) {
    res.json({ posts: posts });
  });
});

app.get("/posts/:postId", function (req, res) {
  Post.find({ _id: req.params.postId }, function (err, post) {
    if (post) {
      res.json(post);
    } else {
      console.log("no post found");
    }
  });
});

app.post("/compose", function (req, res) {
  let post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save();
  res.redirect("/");
});

////////
app.listen(5000, () => console.log("server started on port 5000"));
