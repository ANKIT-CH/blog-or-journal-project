//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");

const homeStartingContent =
  "A journal is a record that stores every details of your life ranging from events, ideas, feelings, and your daily thoughts and memories. In this way, you will be able to remember what you did, what you were thinking and feeling, and what had happened when you were younger. We'll look into how a journal can be used in a many ways!. If you feel unhappy, you can vent your anger through \"brain-dump\". For someone who is managing depression, a journal can be a good way to keep track of your mood. Memorable days such as birthday and holiday trip are also worth to write in a journal so that you can look back and relive those moments next time! As take your first step into journaling, you'll better understand the benefits of a journal and how it can help you in your life.";
const email = "ankit.choudhary.prof@gmail.com";
const contactNo = "7414XXXXXX";
const github = "https://github.com/ANKIT-CH";
const linkedin = "https://www.linkedin.com/in/ankit-choudhary-iiituna/";

const aboutContent =
  "Join many of Journey users and create a healthier, happier mind. A sanctuary for your mind and soul, Journey will help increase your positive energy, be more grateful and a calmer mind by building healthy thinkings through journaling.";
const contactContent = "ankit.choudhary.prof@gmail.com";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var allPosts = [];

app.get("/", function (req, res) {
  res.render("home", {
    homeStartingContent: homeStartingContent,
    allPosts: allPosts,
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const newPost = {
    postTitle: req.body.postTitle,
    postContent: req.body.postContent,
  };
  allPosts.push(newPost);
  console.log(allPosts);
  res.redirect("/");
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", {
    contactContent: contactContent,
    email: email,
    github: github,
    linkedin:linkedin,
    contactNo: contactNo,
  });
});

app.get("/posts/:postTitle", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postTitle);
  console.log(requestedTitle);
  allPosts.forEach((item) => {
    const storedTitle = _.lowerCase(item.postTitle);
    if (requestedTitle == storedTitle) {
      // console.log("match found");
      res.render("post", {
        postTitle: item.postTitle,
        postContent: item.postContent,
      });
    }
  });
  // res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
