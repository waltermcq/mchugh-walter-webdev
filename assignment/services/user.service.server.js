
var app =  require('../../express');
var userModel = require('../models/user/user.model.server.js');

// endpoints
app.post  ('/api/user/', createUser);
app.get   ('/api/user/:userId', findUserById);
app.get   ('/api/user', findUserByCredentials);
app.get   ('/api/username', findUserByUsername);
app.put   ('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);

function createUser(req, res){
    var user = req.body;

    userModel
        .createUser(user)
        .then( function(user){
            res.send(user);
        });
}

function findUserById(req, res){
    var userId = req.params['userId'];

    userModel
        .findUserById(userId)
        .then( function(user){
            res.send(user);
        })
}

function updateUser(req, res){  //userId, user
    var userId = req.params.userId;
    var user = req.body;

    userModel
        .updateUser(userId, user)
        .then( function(status){
                res.sendStatus(200);
            },
            function(error){
                res.sendStatus(404);
            });
}

function deleteUser(req, res){
    var userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then( function(status){
            res.sendStatus(200);
        },
        function(error){
            res.sendStatus(404);
        });
}

function findUserByCredentials(req, res){
    var username = req.query['username'];
    var password = req.query['password'];

    userModel
        .findUserByCredentials(username, password)
        .then( function(user){
            if (user != null){
                res.json(user);
            }
            else {
                res.sendStatus(404);  // user not found
            }
        }, function(error){             // system-wide error
            res.sendStatus(404);
        });
}

function findUserByUsername(req, res){

    var username = req.query['username'];

    userModel
        .findUserByUsername(username)
        .then( function(user){
            if(user == null){
                res.send(username);  // user not found, echo back username
            }
            else {
                res.send('1');       // user exists
            }
        }, function(err){
            res.sendStatus(404);     // system-wide error
        });
}
