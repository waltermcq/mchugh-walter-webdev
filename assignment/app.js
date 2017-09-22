
// this is the server-side entry point

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
var connectionString = 'mongodb://localhost/webdev';                    // local

if(process.env.MLAB_USERNAME_WEBDEV) {                                  // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV;                    // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds147821.mlab.com:47821/heroku_hzk2cnwc';
}

mongoose.connect(connectionString);

require("./services/user.service.server");
require("./services/website.service.server.js");
require("./services/page.service.server.js");
require("./services/widget.service.server.js");
// require("./models/models.server");

