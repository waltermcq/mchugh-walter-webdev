
var mongoose = require('mongoose');
var projUserSchema = require('./user.schema.server.js');
var projUserModel = mongoose.model('ProjUserModel', projUserSchema);  // UserModel must be unique across app; DB collection name

projUserModel.createUser            = createUser;
projUserModel.findUserById          = findUserById;
projUserModel.findUserByCredentials = findUserByCredentials;
projUserModel.findUserByUsername    = findUserByUsername;
projUserModel.findAllUsers          = findAllUsers;
projUserModel.findUserByGoogleId    = findUserByGoogleId;
projUserModel.deleteUser            = deleteUser;
projUserModel.updateUser            = updateUser;

module.exports = projUserModel;         // the service layer can call projUserModel.createUser();

function createUser(user){
    user.roles = ["PUBUSER"];
    return projUserModel.create(user);   // this is async, so we return a promise (return);
}

function findUserByUsername(username){
    return projUserModel.findOne({username: username});   //this is a pattern match, with mongo::find() underlying
}

function findUserById(userId){
        return projUserModel.findById(userId);  // returns first match
}

function findUserByCredentials(username, password){
    return projUserModel.findOne({username: username, password: password});   //this is a pattern match, with mongo::find() underlying
}

function findAllUsers() {
    return projUserModel.find();
}

function findUserByGoogleId(googleId) {
    return projUserModel.findOne({'google.id': googleId})
}

function deleteUser(userId){
    return projUserModel.remove({_id: userId});
}

function updateUser(userId, user){
    // delete user.username;                           // ignore username update if (used with $set : user)
    return projUserModel.update({_id: userId}, {
        $set : {                                    // if we just change to 'set : user' it will override everything
            firstName: user.firstName,
            lastName:  user.lastName,
            email:     user.email
        }
    });
}

