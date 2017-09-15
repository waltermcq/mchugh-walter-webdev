
var mongoose = require('mongoose');

var websiteSchema = mongoose.Schema({
        _user:        {type: mongoose.Schema.ObjectId, ref: "UserModel"},     // enables mongo::populate
        name:        String,
        description: String,
        pages:       [],       // array of references to child page instances
        dateCreated: {type: Date, default: Date.now()}
    }
);

module.exports = websiteSchema;  // make available if this file is require() 'd.