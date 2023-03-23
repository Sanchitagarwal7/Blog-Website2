//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");
const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://Sanchit893:Sanchit1@cluster1.vc9w7iu.mongodb.net/BlogDB',{useNewUrlParser: true});

const homeStartingContent = "Today, I am thrilled to introduce you to a personal blog website that is sure to capture your attention and inspire you in countless ways. This website is a platform for the author to share their thoughts, experiences, and insights with the world, and it is a testament to the power of self-expression and creativity.The personal blog website is a space for the author to showcase their unique voice and perspective. The website is an extension of their personality and allows them to connect with readers on a deeper level. The author's writing is honest, authentic, and vulnerable, drawing readers in and inspiring them to reflect on their own lives and experiences..";
const aboutContent = "This website is made by Sanchit Agarwal, a 2nd year college student from a small but beautiful city, Bareilly. He is enthusiastic and hard working towards his life goals and does what is necessary to achieve them"
const contactContent = "You can contact us"

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  { 
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

const post = mongoose.model('post', PostSchema);


app.get('/', function(req, res){

  // console.log("On home page");

  post.find({})
  .then((elements)=>{
    // console.log(elements);
    res.render('home',{homeContent: homeStartingContent, postArray: elements});
  })
  .catch((err)=>{
    console.log(err);
  });
  ;

  // console.log("Posts array populated");
  // console.log("Rendering the page");
});
app.get('/about', function(req, res){
  res.render('about', {aboutMe: aboutContent})
});
app.get('/contact', function(req, res){
  res.render('contact', {contactMe: contactContent})
});
app.get('/compose', function(req, res){
  // console.log("On compose page");
  res.render('compose');
});

app.post('/compose', function(req, res){
  // console.log("post req came ");

  const newpost = new post ({
    title: req.body.postTitle,
    body: req.body.postBody
  });

  newpost.save();

  // console.log("Saved new post and redirecting");

  res.redirect('/');
});

app.get('/posts/:postID', function(req, res){

  const target = _.lowerCase(req.params.postID);
  const str = target.replace(/\s/g, '');
  // console.log(_.trim(str)); //trims the spaces in between

  post.findById({_id: str})
    .then((post)=>{
          // console.log("Displaying the post page");
          res.render('post', {Title: post.title, Body: post.body})
        })
    .catch((err)=>{
      console.log(err);
    });
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
