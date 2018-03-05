"use strict";

/**
 * Module dependencies.
 */

const home = require("../app/controllers/home");
const post = require("../app/controllers/post");
const comment = require("../app/controllers/comment");
const user = require("../app/controllers/user")
const fan = require("../app/controllers/fan")

/**
 * Expose
 */

module.exports = function(app, io) {
  app.get("/", home.index);

  app.get("/post/", post.index);
  app.get("/admin", post.admin)
  app.get("/post/getTopPosts", post.getTopPosts);
  app.get("/post/getPostsCountByWriter", post.getPostsCountByWriter)
  app.get("/post/getPostStats", post.getPostStats) 
  app.get("/post/:id", post.show);
  app.post("/post/", post.create);
  app.put("/post/:id", post.update);
  app.delete("/post/:id", post.delete);

  app.get("/comment/", comment.index);
  app.get("/comment/:id", comment.show);
  app.post("/comment/", comment.create);
  app.put("/comment/:id", comment.update);
  app.delete("/comment/:id", comment.delete);

  app.get("/fans/", fan.getAll);
  app.get("/fans/:id", fan.getFanById);
  app.get("/fans/:id/posts", fan.getPostsByFanId);  
  app.post("/fans/", fan.create);
  app.put("/fans/:id", fan.edit);
  app.delete("/fans/:id", fan.delete);
  

  app.post("/login/", user.login);
  /**
   * Error handling
   */

  app.use(function(err, req, res, next) {
    // treat as 404
    if (err.message &&
      (~err.message.indexOf("not found") ||
        ~err.message.indexOf("Cast to ObjectId failed"))
    ) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render("500", { error: err.stack });
  });

  // Socket io connection
  io.on('connection', function(socket) {
    socket.emit('socketConnect', 'success');
    socket.on('postDelete', function(data) {
    post.delete(data._id, function(err, res) {
        if (err) throw err;
        socket.emit('postDeleteSuccess', data._id)
      })
    })
  })
};
