// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************
//var app = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const express = require('express');//WHY the 3 dots on require and express??*********************
var db = require("../models");

module.exports = function (app) {
  // HTML Routes
// =============================================================

  app.get("/", function (req, res) {
    res.render("index");
  });
 
  app.get("/forum", function (req, res) {
    db.Post.findAll().then(function (posts) {
      // console.log(posts)

      
      res.render("forum", {Post : posts});
  });
  });


  app.get("/post", function (req, res) {
    res.render("post");
  });

  // API Routes
// =============================================================
  app.post("/api/post", function (req, res) {
    // console.log("Post Data:");
    // console.log(req.body);
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
  // console.log("HERE");
  db.Post.create(req.body).then(function (dbPost) {
      res.json(dbPost);
  });
});


//This is the search for topics
app.get("/search/:query", (req, res) => { //I used search because that's what I used in the forum handlebars form RIGHT? or WRONG?
  let query = req.params.query
  console.log(query, "<=====")
  //term = term.toLowerCase();
  db.Post.findAll({where: { topic:  query}})
    .then(post=>res.render("forum", {Post : post}))
    .catch(err => console.log(err + "@@@@@@@@@@"));
});

  // Reply Create

  // Reply create
  app.post("/api/reply", function (req, res) {
    // console.log("reply Data:");
    // console.log(req.body);
    db.Reply.create({
      name: req.body.name,
      body: req.body.body,
      created_at: req.body.created_at,
      post_id: req.body.post_id

    }).then(function (results) {
      // `results` here would be the newly created reply
      res.json(results);
    });
  });


   
    app.get("/api/replies/:postId", function (req, res) {
      db.Reply.findAll({
        where: {post_id: req.params.postId}
      }).then(function (results) {
        res.json(results);
      });
    });
    
 

  // // app.get reply
  // app.get("/api/reply", function (req, res) {
  //   db.Reply.findOne({}).then(function (results) {
  //       res.render("forum");
  //   });
  // });

  // app.get posts with replies
  // app.get("/api/replies", function (req, res) {
  //   res.render("forum");
  //   var query = {};
  //   if (req.query.post_id) {
  //       query.PostId = req.query.post_id;
  //   }
  //   db.Reply.findAll({
  //       where: query,
  //       include: [db.Post.post_id]
  //   }).then(function (dbReply) {
  //       res.json(dbReply);
  //   });
  // });

  // app.get("/api/post/:id", function(req, res) {
  //   db.Post.findOne({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbPost) {
  //     console.log(dbPost);
  //     res.json(dbPost);
  //   });
  // });

  app.get("/api/replies", function (req, res) {
    var query = {};
    if (req.query.post_id) {
      query.Post.id = req.query.post_id;
    }
    db.Reply.findAll({
      where: query
    }).then(function (dbReply) {
      res.render("forum");
    });
  });


  // 
  app.get('/replies', (req, res) => {
    db.Post.findAll({
      include: [
        {
          model: db.Reply,
        }
      ]
    }).then(Post => {
      const resObj = Post.map(post => {
        return Object.assign(
          {},
          {
            post_id: Post.id,
            name: Post.name,
            Reply: Post.body.map(reply => {
              return Object.assign(
                {},
                {
                  reply_id: reply.id,
                  post_id: post.post_id,
                  body: post.body,
                  reply: post.reply.map(Reply => {
                  
                  })
                }
              );
            })
        });
      });
      res.json(resObj);
      console.log(resObj);
    });
  });

  

}; 