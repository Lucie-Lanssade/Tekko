const express = require("express");

const logger = require("morgan");
const path = require("path");

const cookieParser = require("cookie-parser");

module.exports = (app) => {
  app.set("trust proxy", 1);
  // Normalizes the path to the views folder
  app.set("views", path.join(__dirname, "..", "views"));
  // Sets the view engine to handlebars
  app.set("view engine", "hbs");
  // Handles access to the public folder
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.set("view engine", "hbs");

  const session = require("express-session");
  // Store the session in the database
  const MongoStore = require("connect-mongo");

  app.use(logger("dev"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  // Handles access to the favicon

  app.use(
    session({
      secret: process.env.SESSION_SECRET || "Please manage your secrets",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 12,
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || "mongodb://127.0.0.1/Tekko'",
      }),
    })
  );
};
