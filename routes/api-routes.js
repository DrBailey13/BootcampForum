// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var express = require("express");

//var app = express.Router();

var db = require("../models/post.js");


// Routes
// =============================================================
module.exports = function(app) {
  app.get("/", function(req, res) {        
       res.render("index");
    });
        
  app.get("/forum", function(req, res){
    res.render("forum");
  });

  // Get all posts
  app.get("/api/all", function(req, res) {

  // Finding all Posts, and then returning them to the user as JSON.
    
    db.Post.findAll({}).then(function(results) {
    // results are available to us inside the .then
      res.json(results);
    });
  });

  // Add a post
  app.post("/api/new", function(req, res) {

  console.log("Post Data:");
  console.log(req.body);

  db.Post.create({
     name: req.body.name,
     topic: req.body.topic,
     body: req.body.body,
     created_at: req.body.created_at
     }).then(function(results) {
      // `results` here would be the newly created post
      res.end();
     });
   });
};