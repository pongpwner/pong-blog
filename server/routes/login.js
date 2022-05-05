var express = require("express");
const router = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require("../utils/tokens");
router.route("/").post(async function (req, res) {
  // console.log("------------------");
  // console.log(req.body);
  // console.log(req.body.username);
  // console.log(req.body.password);

  // 1. Find user in array. If not exist send error
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    console.log(user.username);
    console.log(user.id);
    if (!user) {
      return { status: "error", error: "Invalid Login" };
    }
    // 2. Compare crypted password and see if it checks out. Send error if not
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Password not correct");

    // 3. Create Refresh- and Accesstoken

    const accessToken = createAccessToken(user.id, user.username);
    const refreshToken = createRefreshToken(user.id);
    //console.log(accessToken);
    // 4. Store Refreshtoken with user in "db"
    // Could also use different version numbers instead.
    // Then just increase the version number on the revoke endpoint
    // User.findByIdAndUpdate(
    //   user.id,
    //   { token: refreshToken },
    //   function (err, user) {
    //     if (err) {
    //       console.log(err);
    //     }
    //     console.log(user);
    //     console.log("updated");
    //   }
    // );
    // 5. Send token. Refreshtoken as a cookie and accesstoken as a regular response
    // console.log(req);

    sendRefreshToken(res, refreshToken);
    sendAccessToken(req, res, accessToken, user.username);

    //  return res.json({ status: "ok", user: token });
    return;
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
});

module.exports = router;
