
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username:    {type: String, require: true},
    password:    {type: String, require: true},
    firstName:   String,
    lastName:    String,
    email:       String,
    phone:       String,
    websites:    [],       // user to site, site to user
    dateCreated: {type: Date, default: Date.now()}
}
// ,{collection: "user"}   //this hard-sets the collection name to override what is declared in user.model.server.js
);

module.exports = userSchema;  // make available if this file is require() 'd.