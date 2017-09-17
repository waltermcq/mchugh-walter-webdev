var mongoose = require('mongoose');

var widgetSchema = mongoose.Schema({
        _page:       {type: mongoose.Schema.ObjectId, ref: "PageModel"},     // enables mongo::populate
        name:        String,
        type:        {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']},
        text:        String,
        placeholder: String,
        description: String,
        url:         String,
        width:       String,
        height:      String,
        rows:        Number,
        size:        Number,
        class:       String,
        icon:        String,
        deletable:   Boolean,
        formatted:   Boolean,
        order:       Number,
        dateCreated: {type: Date, default: Date.now()}
    }
);

module.exports = widgetSchema;  // make available if this file is require() 'd.