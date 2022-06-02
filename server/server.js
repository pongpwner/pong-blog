const express = require("express");
require("dotenv").config({ path: "../.env" });

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
//const bodyParser = require("body-parser");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const composeRoute = require("./routes/compose");
const postsRoute = require("./routes/posts");
const userRoute = require("./routes/user");
const refreshTokenRoute = require("./routes/refresh-token");
const logoutRoute = require("./routes/logout");
const Post = require("./models/post.model");

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);
app.use("/api/user", userRoute);
app.use("/api/logout", logoutRoute);
app.use("/api/compose", composeRoute);
app.use("/api/posts", postsRoute);
app.use("/api/refresh-token", refreshTokenRoute);

mongoose.connect("mongodb://localhost:27017/pongBlogDB", {
  useNewUrlParser: true,
});
// const currentUser = function (req, res, next) {
//   req.currentUser = null;
//   next();
// };
//app.use(currentUser);

///
app.get("/", function (req, res) {
  Post.find({}, function (err, posts) {
    res.json({ posts: posts });
  });
});

////////
app.listen(process.env.PORT, () =>
  console.log(`server started on port ${process.env.PORT}`)
);
