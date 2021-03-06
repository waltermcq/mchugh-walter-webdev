
var mongoose        = require('mongoose');
var CommentSchema   = require('./comment.schema.server.js');
var CommentModel    = mongoose.model('CommentModel', CommentSchema);  // must be unique across app; DB collection name

var ObjectID = require('mongodb').ObjectID;

CommentModel.createComment          = createComment;
CommentModel.findCommentById        = findCommentById;
CommentModel.findAllComments        = findAllComments;
CommentModel.findAllCommentsByUser  = findAllCommentsByUser;
CommentModel.findAllCommentsForRest = findAllCommentsForRest;
CommentModel.deleteComment          = deleteComment;
CommentModel.updateComment          = updateComment;
CommentModel.createReply            = createReply;
CommentModel.updateReply            = updateReply;
CommentModel.deleteReply            = deleteReply;

module.exports = CommentModel;         // the service layer can call projUserModel.createUser();

function createComment(userId, restaurantId, comment) {
    comment.user = userId;
    comment.restaurant = restaurantId;
    return CommentModel.create(comment);   // this is async, so we return a promise (return);
}

function findCommentById(commentId) {
    return CommentModel.findById(commentId);
}

function findAllComments() {
    return CommentModel.find();
}

function findAllCommentsByUser(userId) {
    return CommentModel
        .find({'user': new ObjectID(userId)});
}

function findAllCommentsForRest(restaurantId) {
    return CommentModel.find({restaurant: restaurantId})
        .populate('user')
        .exec();
}

function deleteComment(commentId){
    return CommentModel.remove({_id: commentId});
}

function updateComment(commentId, comment){
    // delete user.username;                           // ignore username update if (used with $set : user)
    return CommentModel.update({_id: commentId}, {
        $set : {                                    // if we just change to 'set : user' it will override everything
            body: comment.body,
            editFlag: "1"
        }
    });
}

function createReply(commentId, rep) {

    return CommentModel.update({_id: commentId}, {
        $set : {
            replyText : rep.replyText,
            replyAuthor: rep.replyAuthor
        }
    });
}

function updateReply(commentId, rep) {

    return CommentModel.update({_id: commentId}, {
        $set : {
            replyText : rep.replyText,
            replyAuthor: rep.replyAuthor
        }
    });
}

function deleteReply(commentId) {

    return CommentModel.update({_id: commentId}, {
        $set : {
            replyText : "",
            replyAuthor: ""
        }
    });
}