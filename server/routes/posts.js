const Post = require("../models/post.model");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { isAuth } = require("../utils/isAuth");

router.route("/").post(async function (req, res) {
  console.log("postsssssssssssssssssssssssssssssssssssssssss");
  //const token = req.headers["x-access-token"];

  try {
    console.log(req.headers);
    poop();
    const userId = isAuth(req);
    console.log("after auth");
    console.log("userId:" + userId);
    if (userId !== null) {
      Post.find({}, function (err, posts) {
        res.send({ status: "ok", posts: posts });
      });
    }
    //res.json({ status: "error", error: "invalid token", posts: [] });
    //res.send(null);
  } catch (error) {
    res.json({ status: "error", error: "invalid token", posts: [] });
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
