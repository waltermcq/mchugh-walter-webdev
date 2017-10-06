
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username:    {type: String, require: true},
    password:    {type: String, require: true},
    firstName:   String,
    lastName:    String,
    email:       String,
    phone:       String,
    roles:       [{type: String, default: 'USER', enum: ['USER', 'ADMIN']}],
    websites:    [
        {type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}
    ],       // user to site, site to user

    dateCreated: {type: Date, default: Date.now()}
}
// ,{collection: "user"}   //this sets the collection name to override the declared name in user.model.server.js
);

module.exports = userSchema;  // make available if this file is require() 'd.