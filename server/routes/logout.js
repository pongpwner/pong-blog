const router = require("express").Router();
const User = require("../models/user.model");

router.route("/").post(async function (req, res) {
  // const token = req.headers["x-access-token"];
  // console.log("tokenuser:" + token);
  // try {
  //   const decoded = jwt.verify(token, "secret123");
  //   console.log("decoded:" + decoded);
  //   const username = decoded.username;
  //   console.log("username" + username);

  //   res.json({ status: "ok", username: username });
  // } catch (error) {
  //   console.log(error);
  //   res.json({ status: "error", error: "invalid token" });
  // }

  res.clearCookie("refreshtoken", { path: "/api/refresh-token" });
  // Logic here for also remove refreshtoken from db
  return res.send({
    message: "Logged out",
  });
});

module.exports = router;
