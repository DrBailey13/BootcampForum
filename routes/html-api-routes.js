// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************
var express = require("express");

//var app = express.Router();

var db = require("../models");




module.exports = function (app) {
  // HTML Routes
// =============================================================

  app.get("/", function (req, res) {
    res.render("index");
  });
 
  app.get("/forum", function (req, res) {
    db.Post.findAll().then(function (posts) {
      console.log(posts)

      
      res.render("forum", {Post : posts});
  });
  });

  app.get("/forum", function(req, res){
    res.render("forum");
    });

  app.get("/post", function (req, res) {
    res.render("post");
  });

  // API Routes
// =============================================================
  app.post("/api/post", function (req, res) {
    console.log("Post Data:");
    console.log(req.body);
    db.Post.create({
        name: req.body.name,
        topic: req.body.topic,
        body: req.body.body,
        created_at: req.body.created_at
    }).then(function (results) {
        // `results` here would be the newly created post
        res.json(results );
    });
});
app.get("/api/post", function (req, res) {
  res.render("post");
  var query = {};
  if (req.query.name_id) {
      query.NameId = req.query.name_id;
  }
  db.Post.findAll({
      where: query,
      include: [db.Name]
  }).then(function (dbPost) {
      res.json(dbPost);
  });
});

//searching all posts
app.get("/api/all", function (req, res) {
  db.Post.findAll({}).then(function (results) {
      res.json(results);
  });
});

// POST route for saving a new post
app.post("/api/forum", function (req, res) {
  console.log("HERE");
  db.Post.create(req.body).then(function (dbPost) {
      res.json(dbPost);
  });
});


}