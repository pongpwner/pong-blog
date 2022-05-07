const { verify } = require("jsonwebtoken");

const isAuth = (req) => {
  console.log("auth..................");
  const authorization = req.headers["authorization"];
  //console.log(authorization);
  if (!authorization) throw new Error("You need to login.");
  // Based on 'Bearer ksfljrewori384328289398432'
  const token = authorization.split(" ")[1];
  const { userId } = verify(token, "i");
  console.log(userId);
  return userId;
};

module.exports = {
  isAuth,
};
