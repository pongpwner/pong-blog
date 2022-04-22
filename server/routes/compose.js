const router = require("express").Router();
const User = require("../models/user.model");
const Post = require("../models/post.model");

router.route("/").post(function (req, res) {
  let post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save();
});

module.exports = router;
