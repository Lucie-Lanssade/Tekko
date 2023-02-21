const express = require("express");
const hbs = require("hbs");
//"Morgan" est un middleware de journalisation (logging middleware) pour les applications Node.js qui permet de capturer les demandes HTTP et de les enregistrer dans un format facile à lire, généralement dans la console ou dans un fichier.
const logger = require("morgan");
const path = require("path");
//"Cookie-parser" est un middleware pour les applications Node.js qui permet de faciliter la gestion des cookies HTTP. Les cookies sont des petits fichiers de données stockés sur le côté client et envoyés avec chaque demande HTTP à un serveur web. Ils sont souvent utilisés pour stocker des informations de session, des préférences utilisateur, des paniers d'achat, etc.
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
  hbs.registerPartials(path.join(__dirname, "..", "views", "partials"));
  //"Express-session" est un middleware de gestion de session pour les applications Node.js qui permet de stocker des informations de session sur le serveur et de les lier à une session utilisateur unique.
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
        mongoUrl: process.env.MONGODB_URI || "mongodb://127.0.0.1/Tekko",
      }),
    })
  );
};
