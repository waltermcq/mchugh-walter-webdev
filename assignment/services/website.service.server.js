
var app =  require('../../express');

app.post  ('/api/user/:userId/website', createWebsite);
app.get   ('/api/user/:userId/website', findWebsitesByUser);
app.get   ('/api/website/:websiteId', findWebsiteById);
app.put   ('/api/website/:websiteId', updateWebsite);
app.delete('/api/website/:websiteId', deleteWebsite);



var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

function findWebsitesByUser(req, res){

    var userId = req.params.userId;
    var resultSet = [];
    for(var w in websites){
        if(websites[w].developerId === userId){
            resultSet.push(websites[w]);
        }
    }
    res.json(resultSet);
}

function createWebsite(req, res){
    var website = req.body;
    website._id = (new Date()).getTime() + "";
    website.created = new Date();
    website.updated = new Date();
    websites.push(website);
    res.send(website);
}

function findWebsiteById(req, res){
    var websiteId = req.params['websiteId'];
    var website = websites.find(function (website) {
        return website._id === websiteId;
    });
    res.send(website);
}

function updateWebsite(req, res){
    var websiteId = req.params['websiteId'];
    var website = req.body;

    for(var w in websites){
        if(websites[w]._id === websiteId){
            websites[w] = website;
            res.sendStatus(200);  //update OK
            return;
        }
    }
    res.sendStatus(404);           //update failed
}

function deleteWebsite(req, res){
    var websiteId = req.params['websiteId'];

    for(var w in websites){
        if(websites[w]._id === websiteId){
            var index = websites.indexOf(websites[w]);
            websites.splice(index, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}
