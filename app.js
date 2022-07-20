const path = require("path");
const axios = require("axios").default;

const express = require("express");
const { response } = require("express");
const app = express();

const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());

// make our api call
const blogDataUrl = "https://api.npoint.io/c2d12d64d0f8ed630194";
let blogData;

app.get("/", async (req, res) => {
  blogData = await axios.get(blogDataUrl);
  data = blogData.data;
  res.render("index", {posts: data });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/post/:id", async (req, res) => {
  const id = req.params.id;
  blogData = await axios.get(blogDataUrl);
  data = blogData.data;
  for (const post of data){
    if(post.id == id){
      return res.render("post", {myPost: post});
    }
  }
  res.render('404');
});

app.use((req, res) => {
  res.render("404");
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
