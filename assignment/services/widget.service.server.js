





var app =  require('../../express');

// for widget upload
var multer = require('multer');
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

// endpoints
app.post  ('/api/page/:pageId/widget', createWidget);
app.post  ('/api/upload', upload.single('myFile'), uploadImage);
app.get   ('/api/page/:pageId/widget', findWidgetsByPageId);
app.get   ('/api/widget/:widgetId', findWidgetById);
app.put   ('/api/widget/:widgetId', updateWidget);
app.delete('/api/widget/:widgetId', deleteWidget)

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

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

    widget = findWidgetById(widgetId);             //TODO define
    widget.url = '/assignment/uploads/'+filename; //TODO SET URL!

    var callbackUrl = "/assignment/index.html#!/user/" +userId+ "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;  //TODO This should be the URL to go back to the editor.

    res.redirect(callbackUrl);
}

function findWidgetsByPageId(req, res){

    var pageId = req.params['pageId'];

    var resultSet = [];
    for(var w in widgets){
        if(widgets[w].pageId === pageId){
            resultSet.push(widgets[w]);
        }
    }
    res.json(resultSet);
}

function findWidgetById(req, res){
    var widgetId = req.params['widgetId']

    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    res.send(widget);
}

function createWidget(req, res){
    var pageId = req.params['pageId'];
    var widget = req.body;
    widget._id = (new Date()).getTime() + "";
    widget.pageId = pageId;
    widgets.push(widget);
    res.send(widget);
}

function updateWidget(req, res){
    var widgetId = req.params['widgetId']
    var widget = req.body;

    for(var w in widgets){
        if(widgets[w]._id === widgetId){
            widgets[w] = widget;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}


function deleteWidget(req, res){
    var widgetId = req.params['widgetId'];

    for(var w in widgets){
        if(widgets[w]._id === widgetId){
            var index = widgets.indexOf(widgets[w]);
            widgets.splice(index, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}