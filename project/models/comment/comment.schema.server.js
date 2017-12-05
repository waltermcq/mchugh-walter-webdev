
var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    type:        {type:     String,
                  default:  'REVIEW',
                  enum:     ['REVIEW', 'REPLY', 'MESSAGE']
    },

    body:        String,

    user:        {type: mongoose.Schema.Types.ObjectId,
                  ref:  "ProjUserModel"
    },

    restaurant:  String,

    dateCreated: {
        type:    Date,
        default: Date.now()
    },

    replyText:   String,

    replyAuthorId: String,

    editFlag:    {
        type:    String,
                 default: "0"
    }
}
// ,{collection: "user"}   //this sets the collection name to override the declared name in user.model.server.js
);

module.exports = commentSchema;  // make available if this file is require() 'd.