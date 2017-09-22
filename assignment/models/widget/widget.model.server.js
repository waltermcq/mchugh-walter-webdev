
var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server.js');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);  // UserModel must be unique across app; DB collection name

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;

module.exports = widgetModel;

function createWidget(pageId, widget){
    widget._page = pageId;
    return widgetModel
        .create(widget);
}

function findAllWidgetsForPage(pageId){
    return widgetModel
        .find({_page: pageId})
        .populate("_page")                                          // this gets the user object instead of just holding a reference
        .exec();
}

function findWidgetById(widgetId){
    return widgetModel
        .findById(widgetId);
}

function updateWidget(widgetId, widget){
    return widgetModel
        .update({_id: widgetId},
                {$set : widget});
}

function deleteWidget(widgetId){
    return widgetModel.remove({_id: widgetId});
}

