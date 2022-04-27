var express = require("express");
const router = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
router.route("/").post(async function (req, res) {
  console.log("------------------");
  console.log(req.body);
  console.log(req.body.username);
  console.log(req.body.password);
  // console.log(req);
  const user = await User.findOne({ username: req.body.username });
  console.log("1");
  if (!user) {
    return { status: "error", error: "Invalid Login" };
  }
  console.log("2");
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  console.log("3");
  if (isPasswordValid) {
    const token = jwt.sign(
      {
        username: user.username,
      },
      "secret123"
    );
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});
// .get(async (req, res) => {
//   const token = req.headers["x-access-token"];
//   try {
//     const decoded = jwt.verify(token, "secret123");
//     const username = decoded.username;
//   } catch (error) {
//     console.log(error);
//     res.json({ status: "error", error: "invalid token" });
//   }
// });

module.exports = router;
