require('./db')();
const { config } = require('dotenv');
const express = require('express');
const app = express();
require('./config')(app);
app.use(express.static(__dirname + '/public'));
<<<<<<< Updated upstream

const allRoutes = require('./routes/index.js');
app.use('/api', allRoutes);
=======
const hbs = require('hbs');

const allRoutes = require('./routes/index.js');
app.use('/', allRoutes);
>>>>>>> Stashed changes

require('./error-handling')(app);
module.exports = app;
