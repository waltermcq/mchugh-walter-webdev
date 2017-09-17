
var app =  require('../../express');
var widgetModel = require('../models/widget/widget.model.server.js')

// for widget upload
var multer = require('multer');
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

// endpoints
app.post  ('/api/page/:pageId/widget', createWidget);
app.post  ('/api/upload', upload.single('myFile'), uploadImage);
app.get   ('/api/page/:pageId/widget', findWidgetsByPageId);
app.get   ('/api/widget/:widgetId', findWidgetById);
app.put   ('/api/widget/:widgetId', updateWidget);
app.delete('/api/widget/:widgetId', deleteWidget);

// var widgets = [
//     { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
//     { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
//         "url": "http://lorempixel.com/400/200/"},
//     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
//     { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
//         "url": "https://youtu.be/AM2Ivdi9c4E" },
//     { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
// ];

function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId        = req.body.userId;
    var websiteId     = req.body.websiteId;
    var pageId        = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widget = findWidgetById(widgetId);
    widget.url = '/assignment/uploads/'+filename;

    var callbackUrl = "/assignment/index.html#!/user/" +userId+ "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;

    res.redirect(callbackUrl);
}

function findWidgetsByPageId(req, res){

    var pageId = req.params['pageId'];

    widgetModel
        .findAllWidgetsForPage(pageId)
        .then( function(widgets){
            res.json(widgets);
        });
}

function findWidgetById(req, res){
    var widgetId = req.params['widgetId']

    widgetModel
        .findWidgetById(widgetId)
        .then( function(widget){
                res.send(widget);
            },
            function(error){
                res.sendStatus(404);
            });

}

function createWidget(req, res){
    var pageId = req.params['pageId'];
    var widget = req.body;

    return widgetModel
            .createWidget(pageId, widget)
            .then( function(widget){
                res.json(widget);
            },
            function(error){
                res.sendStatus(404);
            });
}

function updateWidget(req, res){
    var widgetId = req.params['widgetId']
    var widget = req.body;

    widgetModel
        .updateWidget(widgetId, widget)
        .then( function(widget){
                res.sendStatus(200);
            },
            function(error){
                res.sendStatus(404);
            });
}


function deleteWidget(req, res){
    var widgetId = req.params['widgetId'];

    widgetModel
        .deleteWidget(widgetId)
        .then( function(widget){
                res.sendStatus(200);
            },
            function(error){
                res.sendStatus(404);
            });
}