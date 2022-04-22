const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

router.route("/").post(async function (req, res) {
  console.log("---------------------");
  console.log(req.body);
  try {
    const newPassword = await bcrypt.hash(req.body.registerPassword, 10);
    // let user = new User({
    //   username: req.body.registerName,
    //   password: newPassword,
    // });
    // user.save();
    // if (!user) {
    //   console.log("registration error");
    //   return res.json({ status: "error" });
    // }
    // return res.json({ status: "ok" });

    await User.create(
      {
        username: req.body.registerName,
        password: newPassword,
      },
      function (err, user) {
        if (err) {
          console.log(err);
        }
      }
    );
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});

module.exports = router;
