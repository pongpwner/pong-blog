const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { isAuth } = require("../utils/isAuth");

router.route("/").post(async function (req, res) {
  Post.find({}, function (err, posts) {
    res.send({ status: "ok", posts: posts });
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
router.route("/:postId/comments").post(function (req, res) {
  //console.log("commentssssssssssssssssssssssssssssssssssssssssssss");
  try {
    //console.log(req.headers);

    const userId = isAuth(req);
    //console.log("after auth");
    //console.log("userId:" + userId);
    if (userId !== null) {
      res.send({ authenticated: true, status: "ok", comments: [] });
    }
    //res.json({ status: "error", error: "invalid token", posts: [] });
    //res.send(null);
  } catch (error) {
    res.send({
      authenticated: false,
      status: "error",
      error: "invalid token",
      posts: [],
    });
  }
});

router.route("/:postId/comment").post(async function (req, res) {
  console.log("postcommentssssssssssssssssssssssssssssssssss");
  console.log(req.body);
  const { userName, postId, content } = req.body;

  try {
    await Comment.create(
      {
        userName: userName,
        postId: postId,
        content: content,
      },
      function (err) {
        if (err) {
          console.log(err);
        }
      }
    );
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "unable to create comment" });
  }
});

module.exports = router;
