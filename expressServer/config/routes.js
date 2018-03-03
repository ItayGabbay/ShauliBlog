"use strict";

/**
 * Module dependencies.
 */

const home = require("../app/controllers/home");
const post = require("../app/controllers/post");
const comment = require("../app/controllers/comment");
const user = require("../app/controllers/user")

/**
 * Expose
 */

module.exports = function(app, passport) {
  app.get("/", home.index);

  app.get("/post/", post.index);
  app.get("/post/:id", post.show);
  app.post("/post/", post.create);
  app.put("/post/:id", post.update);
  app.delete("/post/:id", post.delete);
  app.get("/post/getTopPosts", post.getTopPosts);

  app.get("/comment/", comment.index);
  app.get("/comment/:id", comment.show);
  app.post("/comment/", comment.create);
  app.put("/comment/:id", comment.update);
  app.delete("/comment/:id", comment.delete);

  app.post("/login/", user.login);
  /**
   * Error handling
   */

  app.use(function(err, req, res, next) {
    // treat as 404
    if (
      err.message &&
      (~err.message.indexOf("not found") ||
        ~err.message.indexOf("Cast to ObjectId failed"))
    ) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render("500", { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function(req, res, next) {
    res.status(404).render("404", {
      url: req.originalUrl,
      error: "Not found"
    });
  });
};
