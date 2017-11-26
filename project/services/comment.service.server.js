
var app           = require('../../express');
var commentModel  = require('../models/comment/comment.model.server.js');

app.get   ('/api/project/comment/:commentId',     findCommentById);
app.get   ('/api/project/:restaurantId/comment',  findAllCommentsforRest);
app.post  ('/api/project/:restaurantId/comment',  createComment);


// app.get   ('/api/project/:restaurantId/comment',  isAdmin, findAllUsers);
// app.put   ('/api/project/comment/:commentId',     updateComment);
// app.delete('/api/project/comment/:commentId',     deleteComment);
// app.delete('/api/project/comment/:commentId', isAdmin, deleteComment);
// app.put   ('/api/user/:id',  auth, updateUser);
// app.delete('/api/user/:id',  auth, deleteUser);

function findCommentById(req, res) {
    var commentId = req.params['commentId'];

    commentModel
        .findCommentById(commentId)
        .then( function(comment){
            res.send(comment);
        })
}

function findAllCommentsforRest(req, res) {
    var restaurantId = req.params['restaurantId'];

    commentModel
        .findAllCommentsForRest(restaurantId)
        .then(
            function(comments){
                res.json(comments);
            },
            function(error){
                res.sendStatus(404);
            });
}

function createComment(req, res) {
    var restaurantId = req.params['restaurantId'];
    var userId = req.body.user;
    var comment = req.body;

    commentModel
        .createComment(userId, restaurantId, comment)
        .then(
            function(comment){
                res.json(comment);
            },
            function(error){
                res.sendStatus(404);
            });
}

function updateComment() {

}

function deleteComment() {

}