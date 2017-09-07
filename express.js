// utility by jannunzi
// encapsulates express instance, lets us skip passing it around
const express = require('express');      // load express library
const app = express();                   // instantiate instance of "app" and encapsulates
app.express = express;
module.exports = app;                    // tie to exports

