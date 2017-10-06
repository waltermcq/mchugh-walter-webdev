

var mongoose = require('mongoose');
var userSchema = require('./user.schema.server.js');
var userModel = mongoose.model('UserModel', userSchema);  // UserModel must be unique across app; DB collection name

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.deleteUser = deleteUser;
userModel.updateUser = updateUser;

module.exports = userModel;         // the service layer can call userModel.createUser();

function createUser(user){
    user.roles = ["USER"];
    return userModel.create(user);   // this is async, so we return a promise (return);
}

function findUserByUsername(username){
    return userModel.findOne({username: username});   //this is a pattern match, with mongo::find() underlying
}

function findUserById(userId){
        return userModel.findById(userId);  // returns first match
}

function findUserByCredentials(username, password){
    return userModel.findOne({username: username, password: password});   //this is a pattern match, with mongo::find() underlying
}

function deleteUser(userId){
    return userModel.remove({_id: userId});
}


function updateUser(userId, user){
    // delete user.username;                           // ignore username update if (used with $set : user)
    return userModel.update({_id: userId}, {
        $set : {                                    // if we just change to 'set : user' it will override everything
            firstName: user.firstName,
            lastName:  user.lastName,
            email:     user.email
        }
    });
}