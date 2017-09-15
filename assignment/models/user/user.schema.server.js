
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [],       // user to site, site to user
    dateCreated: Date
});

module.exports = userSchema;  // make available if this file is require() 'd.