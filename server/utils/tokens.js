const { sign } = require("jsonwebtoken");
//create tokens
const createAccessToken = (userId) => {
  return sign({ userId }, "i", {
    expiresIn: "15m",
  });
};

const createRefreshToken = (userId) => {
  return sign({ userId }, "i", {
    expiresIn: "7d",
  });
};

// Send tokens
// ----------------------------------
const sendAccessToken = (req, res, accesstoken) => {
  res.send({
    accesstoken,
    username: req.body.username,
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
