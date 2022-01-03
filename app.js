//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent =
  "A journal is a record that stores every details of your life ranging from events, ideas, feelings, and your daily thoughts and memories. In this way, you will be able to remember what you did, what you were thinking and feeling, and what had happened when you were younger. We'll look into how a journal can be used in a many ways!. If you feel unhappy, you can vent your anger through \"brain-dump\". For someone who is managing depression, a journal can be a good way to keep track of your mood. Memorable days such as birthday and holiday trip are also worth to write in a journal so that you can look back and relive those moments next time! As take your first step into journaling, you'll better understand the benefits of a journal and how it can help you in your life.";
const email = "ankit.xxxxx@gmail.com";
const contactNo = "7414XXXXXX";
const github = "https://github.com/ANKIT-CH";
const linkedin = "https://www.linkedin.com/in/ankit-choudhary-iiituna/";

const aboutContent =
  "Join many of Journey users and create a healthier, happier mind. A sanctuary for your mind and soul, Journey will help increase your positive energy, be more grateful and a calmer mind by building healthy thinkings through journaling.";
const contactContent = "ankit.xxxxx@gmail.com";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/ankitBlogDB");
mongoose.connect(
  "mongodb+srv://admin-admin:<PASSWORD@cluster0.zosun.mongodb.net/ankitBlogDB"
);

const postSchema = {
  title: String,
  content: String,
};
const PostModel = mongoose.model("PostModel", postSchema);

app.get("/", function (req, res) {
  var allPosts = [];

  PostModel.find({}, function (err, posts) {
    if (!err) {
      console.log("All posts fetched Successfully");
      allPosts = posts;
    } else {
      console.log("Error ocurred while fetching All Posts");
    }
    res.render("home", {
      homeStartingContent: homeStartingContent,
      allPosts: allPosts,
    });
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new PostModel({
    // title: _.lowerCase(req.body.postTitle),
    title: req.body.postTitle,
    content: req.body.postContent,
  });
  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
  // res.redirect("/");
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", {
    contactContent: contactContent,
    email: email,
    github: github,
    linkedin: linkedin,
    contactNo: contactNo,
  });
});

app.get("/posts/:postId", function (req, res) {
  // const requestedPostId = _.lowerCase(req.params.postId);
  const requestedPostId = req.params.postId;

  console.log(requestedPostId);
  PostModel.findOne({ _id: requestedPostId }, function (err, result) {
    if (!err) {
      console.log("One Post fetched Successfully");
      console.log(result);
      res.render("post", {
        post: result,
      });
    } else {
      console.log("Error ocurred while fetching All Posts");
      res.redirect("/");
    }
  });

  // allPosts.forEach((item) => {
  //   const storedTitle = _.lowerCase(item.postId);
  //   if (requestedPostId === storedTitle) {
  //     // console.log("match found");
  //     res.render("post", {
  //       postId: item.postId,
  //       postContent: item.postContent,
  //     });
  //   }
  // });
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log("Server started");
});
