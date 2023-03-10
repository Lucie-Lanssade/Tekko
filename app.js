require("./db")();
const { config } = require("dotenv");
const express = require("express");
const app = express();

require("./config")(app);
app.use(express.static(__dirname + "/public"));
const hbs = require("hbs");

app.use("/", require("./middlewares/route-guard").exposeUserToView);

const allRoutes = require("./routes/index.js");
app.use("/", allRoutes);

require("./error-handling")(app);
module.exports = app;
