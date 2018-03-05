/**
 * Module dependencies.
 */

var express = require("express");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cookieSession = require("cookie-session");
var bodyParser = require("body-parser");

var mongoStore = require("connect-mongo")(session);
var config = require("./");
var pkg = require("../package.json");

var env = process.env.NODE_ENV || "development";

/**
 * Expose
 */

module.exports = function(app) {
  // Static files middleware
  app.use(express.static(config.root + "/public"));

  // set views path and default layout
  // app.set("views", config.root + "/views");
  app.set("view engine", "html");

  // expose package.json to views
  app.use(function(req, res, next) {
    res.locals.pkg = pkg;
    res.locals.env = env;
    next();
  });

  // bodyParser should be above methodOverride
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());

  // cookieParser should be above session
  app.use(cookieParser());
  app.use(cookieSession({ secret: "secret" }));
  app.use(
    session({
      secret: pkg.name,
      proxy: true,
      resave: true,
      saveUninitialized: true,
      store: new mongoStore({
        url: config.db,
        collection: "sessions"
      })
    })
  );
};
