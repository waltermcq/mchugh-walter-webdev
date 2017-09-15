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
var userModel = mongoose.model('UserModel', userSchema);  // UserModel must be unique across app

userModel.createUser = createUser;

module.exports = userModel;         // the service layer can call userModel.createUser();

function createUser(user){
    return userModel.create(user);   // this is async, so we return a promise (return);

}