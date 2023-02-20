const express = require("express");

const logger = require("morgan");

const cookieParser = require("cookie-parser");

module.exports = (app) => {
  app.set("trust proxy", 1);
  app.set("view engine", "hbs");

  app.use(logger("dev"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
