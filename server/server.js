const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
//const bodyParser = require("body-parser");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const composeRoute = require("./routes/compose");
const postsRoute = require("./routes/posts");
const userRoute = require("./routes/user");
const Post = require("./models/post.model");
const bodyParser = require("body-parser");

app.use(cors());
//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);
app.use("/api/user", userRoute);
app.use("/compose", composeRoute);
app.use("/posts", postsRoute);

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
app.listen(5000, () => console.log("server started on port 5000"));
