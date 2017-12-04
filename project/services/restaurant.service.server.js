
var app              = require('../../express');
var restaurantModel  = require('../models/restaurant/restaurant.model.server.js');

app.get   ('/api/project/restaurant/:restaurantId', findRestById);
app.get   ('/api/project/restaurant',               findAllRest);     // isAdmin,
app.get   ('/api/project/:userId/restaurant',       findRestForUser); // isSeller ?
app.post  ('/api/project/restaurant/:restaurantId', createRest);      // isAdmin or isSeller
app.put   ('/api/project/restaurant/:restaurantId', updateRest);  //auth
app.delete('/api/project/restaurant/:restaurantId', deleteRest);  //auth

function findRestById(req, res) {
    var restaurantId = req.params['restaurantId'];

    restaurantModel
        .findRestById(restaurantId)
        .then(
            function(restaurant){
                res.json(restaurant);
            },
            function(error){
                res.sendStatus(404);
            });
}

function findAllRest(req, res) {

    restaurantModel
        .findAllRest()
        .then(
            function(restaurant){
                res.json(restaurant);
            },
            function(error){
                res.sendStatus(404);
            });
}

function findRestForUser(req, res) {
    var userId = req.params['userId'];

    restaurantModel
        .findRestForUser(userId)
        .then(
            function(restaurant){
                res.json(restaurant);
            },
            function(error){
                res.sendStatus(404);
            });
}

function createRest(req, res) {
    var restaurantId = req.params['restaurantId'];
    var restaurant = req.body;

    restaurantModel
        .createRest(restaurantId, restaurant)
        .then(
            function(restaurant){
                res.json(restaurant);
                // res.sendStatus(200);
            },
            function(error){
                res.sendStatus(404);
            });
}

function updateRest(req, res) {
    var restaurantId = req.params['restaurantId'];
    var restaurant = req.body;

    restaurantModel
        .updateRest(restaurantId, restaurant)
        .then(
            function(status){
                res.sendStatus(200);
            },
            function(error){
                res.sendStatus(404);
            });
}

function deleteRest(req, res) {
    var restaurantId = req.params['restaurantId'];

    restaurantModel
        .updateRest(restaurantId, restaurant)
        .then(
            function(status){
                res.sendStatus(200);
            },
            function(error){
                res.sendStatus(404);
            });
}