const { sign } = require("jsonwebtoken");
require("dotenv").config({ path: "../../.env" });

//create tokens
const createAccessToken = (userId, username) => {
  return sign({ userId, username }, process.env.ACCESS_TOKEN_SECRET, {
    //i  process.env.ACCESS_TOKEN
    expiresIn: "15m",
  });
};

const createRefreshToken = (userId) => {
  return sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    //i process.env.REFRESH_TOKEN,
    expiresIn: "7d",
  });
};

// Send tokens
// ----------------------------------
const sendAccessToken = (req, res, accesstoken, username) => {
  res.send({
    accesstoken,
    username: username,
  });
};

const sendRefreshToken = (res, token) => {
  res.cookie("refreshtoken", token, {
    httpOnly: true,
    path: "/api/refresh-token",
  });
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
};
