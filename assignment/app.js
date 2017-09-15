
// this is the server-side entry point

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://localhost/webdev');

require("./services/user.service.server");
require("./services/website.service.server.js");
require("./services/page.service.server.js");
require("./services/widget.service.server.js");

