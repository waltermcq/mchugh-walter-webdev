
var app           = require('../../express');
var commentModel  = require('../models/comment/comment.model.server.js');

app.get   ('/api/project/comment/:commentId',    findCommentById);
app.get   ('/api/project/:restaurantId/comment', findAllCommentsforRest);
app.get   ('/api/project/:restaurantId/comment', findAllComments);           //TODO isAdmin
app.post  ('/api/project/:restaurantId/comment', createComment);
app.put   ('/api/project/comment/:commentId',    updateComment);
app.delete('/api/project/comment/:commentId',    deleteComment);

// app.get   ('/api/project/:commentId/reply',      getReply);   // probably don't need this
app.post  ('/api/project/:commentId/reply',      createReply);
app.put   ('/api/project/:commentId/reply',      updateReply);
app.delete('/api/project/:commentId/reply',      deleteReply);

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

function findAllComments() {

    commentModel
        .findAllComments()
        .then(
            function(comments){
                res.json(comments);
            },
            function(error){
                res.sendStatus(404);
            });
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

function updateComment(req, res) {
    var commentId = req.params['commentId'];
    var comment = req.body;

    commentModel
        .updateComment(commentId, comment)
        .then(
            function(status){
                res.sendStatus(200);
            },
            function(error){
                res.sendStatus(404);
            });
}

function deleteComment(req, res) {
    var commentId = req.params['commentId'];

    commentModel
        .deleteComment(commentId)
        .then(
            function(status){
                res.sendStatus(200);
            },
            function(error){
                res.sendStatus(404);
            });
}

function createReply(req, res) {
    var commentId = req.params['commentId']
    var reply = req.body;

    commentModel
        .createReply(commentId, reply)
        .then(
            function(status){
                res.sendStatus(200);
            },
            function(error){
                res.sendStatus(404);
            });

}

function updateReply(req, res) {
    var commentId = req.params['commentId']
    var reply = req.body;

    commentModel
        .updateReply(commentId, reply)
        .then(
            function(status){
                res.sendStatus(200);
            },
            function(error){
                res.sendStatus(404);
            });

}

function deleteReply(req, res) {
    var commentId = req.params['commentId']

    commentModel
        .deleteReply(commentId)
        .then(
            function(status){
                res.sendStatus(200);
            },
            function(error){
                res.sendStatus(404);
            });

}