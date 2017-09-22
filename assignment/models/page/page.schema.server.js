var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
        _website:    {type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"},     // enables mongo::populate
        name:        String,
        title:       String,
        description: String,
        widgets:     [{type: mongoose.Schema.Types.ObjectId, ref: "WidgetModel"}],       // array of references to child page instances
        dateCreated: {type: Date, default: Date.now()}
    }
);

module.exports = pageSchema;  // make available if this file is require() 'd.