const Post = require("../models/post.model");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.route("/").get(function (req, res) {
  const token = req.headers["x-access-token"];
  console.log("token:" + token);
  try {
    const decoded = jwt.verify(token, "secret123");
    console.log("decoded:" + decoded);
    const username = decoded.username;
    console.log("username" + username);
    Post.find({}, function (err, posts) {
      res.json({ status: "ok", posts: posts, username: username });
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

router.route("/:postId").get(function (req, res) {
  Post.find({ _id: req.params.postId }, function (err, post) {
    if (post) {
      res.json(post);
    } else {
      console.log("no post found");
    }
  });
});

module.exports = router;
