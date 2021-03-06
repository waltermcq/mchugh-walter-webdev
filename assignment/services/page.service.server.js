
var app =  require('../../express');
var pageModel = require('../models/page/page.model.server.js')

app.post  ('/api/website/:websiteId/page', createPage);
app.get   ('/api/website/:websiteId/page', findPageByWebsiteId);
app.get   ('/api/page/:pageId', findPageById);
app.put   ('/api/page/:pageId', updatePage);
app.delete('/api/page/:pageId', deletePage);
app.put   ('/page/:pageId/widget', orderWidgetsForPage);

function createPage(req, res){
    var websiteId = req.params['websiteId'];
    var page = req.body;

    return pageModel
        .createPage(websiteId, page)
        .then( function(page){
                res.json(page);
            },
            function(error){
                res.sendStatus(404);
            });
}

function findPageByWebsiteId(req, res){

    var websiteId = req.params['websiteId'];

    pageModel
        .findAllPagesForWebsite(websiteId)
        .then( function(pages){
            res.json(pages);
        },
        function(error){
            res.sendStatus(404);
        });
}

function findPageById(req, res){
    var pageId = req.params['pageId'];

    pageModel
        .findPageById(pageId)
        .then( function(page){
                res.send(page);
            },
            function(error){
                res.sendStatus(404);
            });
}

function updatePage(req, res){
    var pageId = req.params['pageId']
    var page = req.body;

    pageModel
        .updatePage(pageId, page)
        .then( function(page){
                res.sendStatus(200);
            },
            function(error){
                res.sendStatus(404);
            });
}

function deletePage(req, res){
    var pageId = req.params['pageId'];

    pageModel
        .deletePage(pageId)
        .then( function(page){
                res.sendStatus(200);
            },
            function(error){
                res.sendStatus(404);
            });
}

function orderWidgetsForPage(req, res){
    var pageId = req.params['pageId'];
    var index1 = req.query['start'];  // index1
    var index2 = req.query['end'];    // index2

    pageModel
        .orderWidgetsForPage(pageId, index1, index2)
        .then( function(widgets){
                // console.log(widgets);
                res.sendStatus(200);
            },
            function(error){
                res.sendStatus(404);
            });
}