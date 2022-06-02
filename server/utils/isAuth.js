const { verify } = require("jsonwebtoken");
require("dotenv").config({ path: "../../.env" });
const isAuth = (req) => {
  console.log("auth..................");
  const authorization = req.headers["authorization"];
  //console.log(authorization);
  if (!authorization) throw new Error("You need to login.");
  // Based on 'Bearer ksfljrewori384328289398432'
  const token = authorization.split(" ")[1];
  const { userId } = verify(token, process.env.ACCESS_TOKEN_SECRET);
  console.log(userId);
  return userId;
};

module.exports = {
  isAuth,
};
