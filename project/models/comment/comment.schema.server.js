
var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    type:        {type:     String,
                  default:  'REVIEW',
                  enum:     ['REVIEW', 'REPLY', 'MESSAGE']
    },
    body: String,
    author:      {type: mongoose.Schema.Types.ObjectId,
                  ref:  "ProjUserModel"
    },

    restaurant:  [{type: mongoose.Schema.Types.ObjectId,
                   ref: "RestaurantModel"
    }],
    dateCreated: {
        type:    Date,
        default: Date.now()
    }
}
// ,{collection: "user"}   //this sets the collection name to override the declared name in user.model.server.js
);

module.exports = projUserSchema;  // make available if this file is require() 'd.