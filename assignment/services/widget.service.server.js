

// POST        /api/page/:pageId/widget        createWidget
// GET         /api/page/:pageId/widget        findAllWidgetsForPage
// GET         /api/widget/:widgetId           findWidgetById
// PUT         /api/widget/:widgetId           updateWidget
// DELETE      /api/widget/:widgetId           deleteWidget

var app =  require('../../express');

// for widget upload
var multer = require('multer');
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

// endpoints
app.post ("/api/upload", upload.single('myFile'), uploadImage);

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

    // widget = getWidgetById(widgetId);             //TODO define
    // widget.url = '/assignment/uploads/'+filename; //TODO SET URL!

    // var callbackUrl = "/assignment/#/user/" +userId+ "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;  //TODO This should be the URL to go back to the editor.
    var callbackUrl = "/assignment/index.html#!/user/" +userId+ "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;  //TODO This should be the URL to go back to the editor.

    res.redirect(callbackUrl);
}

