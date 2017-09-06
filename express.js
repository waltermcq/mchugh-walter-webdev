
// utility
// encapsulates express instance, lets us skip passing it around
const express = require('express');
const app = express();
app.express = express;
module.exports = app;

