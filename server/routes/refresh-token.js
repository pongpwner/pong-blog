const router = require("express").Router();
const User = require("../models/user.model");
const { verify } = require("jsonwebtoken");
const {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require("../utils/tokens");

router.route("/").post(async (req, res) => {
  console.log("TOKEN   :" + req.cookies.refreshtoken);
  const token = req.cookies.refreshtoken;
  // If we don't have a token in our request
  if (!token) return res.send({ accesstoken: "" });
  // We have a token, let's verify it!
  let payload = null;
  try {
    payload = verify(token, "i");
  } catch (err) {
    console.log(err.message);
    return res.send({ accesstoken: null });
  }
  // token is valid, check if user exist
  //const user = fakeDB.find((user) => user.id === payload.userId);
  const user = await User.findOne({ id: payload.userId });
  if (!user) {
    console.log("no user");
    return res.send({ accesstoken: "" });
  }
  //** COMEBACK WHEN ADD SESSION TO USER COLLECTION */
  // user exist, check if refreshtoken exist on user
  // if (user.refreshtoken !== token) {
  //   console.log("wrong token:lllllllllllllllllllllllll");
  //   console.log(token);
  //   console.log("//////////////////////////////////////");
  //   console.log(user.refreshtoken);
  //   return res.send({ accesstoken: "" });
  // }
  //

  //

  // token exist, create new Refresh- and accesstoken
  const accesstoken = createAccessToken(user.id);
  const refreshtoken = createRefreshToken(user.id);
  // update refreshtoken on user in db
  // Could have different versions instead!
  user.refreshtoken = refreshtoken;
  // All good to go, send new refreshtoken and accesstoken
  sendRefreshToken(res, refreshtoken);
  return res.send({ accesstoken });
});

module.exports = router;