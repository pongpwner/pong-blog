const Post = require("../models/post.model");
const router = require("express").Router();

router.route("/").get(function (req, res) {
  Post.find({}, function (err, posts) {
    res.json({ posts: posts });
  });
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
