//
// createUser(user)
// Creates a new user instance
//
// findUserById(userId)
// Retrieves a user instance whose _id is equal to parameter userId
//
// findUserByUsername(username)
// Retrieves a user instance whose username is equal to parameter username
//  `
// findUserByCreadentials(username, password)
// Retrieves a user instance whose username and password are equal to parameters userId and password
//
// updateUser(userId, user)
// Updates user instance whose _id is equal to parameter userId
//
// deleteUser(userId)
// Removes user instance whose _id is equal to parameter userId

var mongoose = require('mongoose');
var userSchema = require('./user.schema.server.js');
var userModel = mongoose.model('UserModel', userSchema);  // UserModel must be unique across app; DB collection name

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.deleteUser = deleteUser;
userModel.updateUser = updateUser;

module.exports = userModel;         // the service layer can call userModel.createUser();

function createUser(user){
    return userModel.create(user);   // this is async, so we return a promise (return);
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
    // delete user.username;                           // ignore username update
    return userModel.update({_id: userId}, {
        $set : {                                    // if we just change to 'set : user' it will override everything
            firstName: user.firstName,
            lastName:  user.lastName,
            email:     user.email
        }
    });
}