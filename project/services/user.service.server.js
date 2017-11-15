
var app           = require('../../express');
var userModel     = require('../models/user/user.model.server.js');
var session       = require('express-session');
var projPassport  = require('passport');
var auth          = authorized;

var ProjLocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};

var bcrypt = require("bcrypt-nodejs");

projPassport.use(new GoogleStrategy(googleConfig, googleStrategy));
projPassport.use('projLocal', new ProjLocalStrategy(localStrategy));    //might not need first arg
projPassport.serializeUser(serializeUser);
projPassport.deserializeUser(deserializeUser);

// endpoints

app.post  ('/api/project/login', projPassport.authenticate('projLocal'), login);
app.post  ('/api/project/logout',       logout);
app.post  ('/api/project/register',     register);
// app.post  ('/api/user',      auth, createUser);
app.get   ('/api/project/loggedin',     loggedin);
app.get   ('/api/project/admin',        checkAdmin);
// app.get   ('/api/user',   auth, findAllUsers);
app.get   ('/api/project/user',   isAdmin, findAllUsers);
// app.put   ('/api/user/:id',  auth, updateUser);
// app.delete('/api/user/:id',  auth, deleteUser);

app.post  ('/api/project/user/',        createUser);
app.get   ('/api/project/user/:userId', findUserById);
// app.get   ('/api/user',         findUserByCredentials);
app.get   ('/api/project/username',     findUserByUsername);
app.put   ('/api/project/user/:userId', updateUser);
app.delete('/api/project/user/:userId', isAdmin, deleteUser);
app.delete('/api/project/unregister', unregister);

app.get   ('/auth/project/google', projPassport.authenticate('projGoogle', { scope : ['profile', 'email'] }));

app.get('/auth/project/google/callback',
    projPassport.authenticate('projGoogle', {
        successRedirect: '/project/index.html#!/profile',
        failureRedirect: '/project/index.html#!/login'
    }));

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);          // set as currently logged-in user
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token                //can be used in other apps, avoid re-authentication
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}



function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(
            function(user) {
                if(user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            },
            function(err) {
                if (err) {
                    return done(err);
                }
            }
        );
}

function authorized(req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401);
    } else {
        next();
    }
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function logout(req, res) {
    req.logOut();               // passport abstracted feature to clear session, invalidate cookie
    res.send(200);
}

function loggedin(req, res) {          // as long as user is logged in, user is available in req

    if(req.isAuthenticated()){
        res.json(req.user);
    } else{
        res.send('0');
    }
}

function checkAdmin(req, res) {          // as long as user is logged in, user is available in req

    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1){
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function isAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1){
        next();
    } else {
        res.sendStatus(401);  // unauthorized
    }
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {      // pull from cookie
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function register(req, res){
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);

    userModel
        .createUser(user)
        .then(
            function(user){
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            }
        );

    // .then( function(user){
    //     req.login(user, function(status){  // notify passport - add to session, new cookie
    //         res.json(user);
    //     });
    // });
}

function unregister(req, res) {

    userModel
        .deleteUser(req.user._id)  // this works but throws an error
        .then( function(status) {
            req.user.logout();
            res.sendStatus(200);
        });

}

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

function findAllUsers(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];

    if(username && password) {
        return findUserByCredentials(req, res);
    }

    return userModel
        .findAllUsers()
        .then( function(users) {
                res.json(users);
            },
            function(error) {
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
