const Post = require("../models/post.model");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.route("/").get(function (req, res) {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret123");

    const username = decoded.username;

    Post.find({}, function (err, posts) {
      res.json({ status: "ok", posts: posts });
    });
  } catch (error) {
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
