
var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    type:        {type:     String,
                  default:  'REVIEW',
                  enum:     ['REVIEW', 'REPLY', 'MESSAGE']
    },

    body:        String,

    user  :      {type: mongoose.Schema.Types.ObjectId,
                  ref:  "ProjUserModel"
    },

    restaurant:  [{type: mongoose.Schema.Types.ObjectId,
                   ref: "RestaurantModel"
    }],

    dateCreated: {
        type:    Date,
        default: Date.now()
    },

    replyTo:     {type: mongoose.Schema.Types.Object,
                 ref: "CommentModel"
    },

    editFlag:    {
        type:    String,
                 default: "0"
    }
}
// ,{collection: "user"}   //this sets the collection name to override the declared name in user.model.server.js
);

module.exports = CommentSchema;  // make available if this file is require() 'd.