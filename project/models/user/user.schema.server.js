
var mongoose = require('mongoose');

var projUserSchema = mongoose.Schema({
    username:    {type: String, require: true},
    password:    {type: String, require: true},
    firstName:   String,
    lastName:    String,
    google: {
        id:    String,
        token: String
    },
    email:       String,
    phone:       String,
    roles:       [{type: String, default: 'PUBUSER', enum: ['PUBUSER', 'SELLER', 'ADMIN']}],
    restaurant:  [{type: mongoose.Schema.Types.ObjectId,
                   ref: "RestaurantModel"}],
    comment:     [{type: mongoose.Schema.Types.ObjectId,
                   ref: "CommentModel"}],
    dateCreated: {
        type:    Date,
        default: Date.now()
    }
}
// ,{collection: "user"}   //this sets the collection name to override the declared name in user.model.server.js
);

module.exports = projUserSchema;  // make available if this file is require() 'd.