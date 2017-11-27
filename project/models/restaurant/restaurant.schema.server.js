
var mongoose = require('mongoose');

var restaurantSchema = mongoose.Schema({

    user: {type: mongoose.Schema.Types.ObjectId,
           ref:  "ProjUserModel"
    },

    offer: String,

    restaurantId: String,

    dateClaimed: {type: Date,
                  default: Date.now()
    }

}
// ,{collection: "user"}   //this sets the collection name to override the declared name in user.model.server.js
);

module.exports = restaurantSchema;  // make available if this file is require() 'd.