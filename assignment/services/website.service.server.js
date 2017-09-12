

// POST        /api/user/:userId/website       createWebsite
// GET         /api/user/:userId/website       findWebsitesByUser
// GET         /api/website/:websiteId         findWebsiteById
// PUT         /api/website/:websiteId         updateWebsite
// DELETE      /api/website/:websiteId         deleteWebsite

var app =  require('../../express');

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

app.post('/api/user/:userId/website', createWebsite);
app.get('/api/user/:userId/website', findWebsitesByUser);


function findWebsitesByUser(req, res){

    var userId = req.params.userId;
    var resultSet = [];
    for(var w in websites){
        if(websites[w].developerId === userId){
            /*websites[w].created = new Date();
            websites[w].updated = new Date();*/
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