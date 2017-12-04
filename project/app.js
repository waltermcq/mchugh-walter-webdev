
// this is the server-side entry point

var mongooseProj = require('mongoose');
mongooseProj.Promise = require('q').Promise;
var connectionString = 'mongodb://localhost/webdev_proj';               // local

if(process.env.MLAB_USERNAME_WEBDEV) {                                  // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV;                    // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds147821.mlab.com:47821/heroku_hzk2cnwc';
}

mongooseProj.connect(connectionString);

require("./services/user.service.server.js");
require("./services/comment.service.server.js");
require("./services/restaurant.service.server.js");

// require("./services/website.service.server.js");

// require("./models/models.server");  // this is where the above mongoose-related and heroku environment code would go

