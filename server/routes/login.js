var express = require("express");
const router = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
router.route("/").post(async function (req, res) {
  console.log("------------------");
  console.log(req.body);
  console.log(req.body.loginName);
  console.log(req.body.loginPassword);
  // console.log(req);
  const user = await User.findOne({ username: req.body.loginName });

  if (!user) {
    return { status: "error", error: "Invalid Login" };
  }
  const isPasswordValid = await bcrypt.compare(
    req.body.loginPassword,
    user.password
  );

  if (isPasswordValid) {
    return res.json({ status: "ok", user: user });
  } else {
    console.log("login failed");
  }
});

module.exports = router;
