const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

router.route("/").post(async function (req, res) {
  console.log("---------------------");
  console.log(req.body);

  const { registerName, registerPassword } = req.body;
  try {
    const user = await User.findOne({ username: registerName });
    // 1. Check if the user exist
    if (user) throw new Error("User already exist");

    // 2. If not user exist already, hash the password
    const newPassword = await bcrypt.hash(registerPassword, 10);

    // 3. Insert the user in "database"
    await User.create(
      {
        username: registerName,
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
