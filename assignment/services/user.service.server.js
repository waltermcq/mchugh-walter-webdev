
// check piazza about this: "about endpoints in express"
//
// HTTP Method, URL Pattern, Function Name
// POST    /api/user                                           createUser
// GET     /api/user?username=username                         findUserByUsername
// GET     /api/user?username=username&password=password       findUserByCredentials
// GET     /api/user/:userId                                   findUserById
// PUT     /api/user/:userId                                   updateUser
// DELETE  /api/user/:userId                                   deleteUser

var app =  require('../../express');

// endpoints
//
// app.delete('/api/user/:userId', deleteUser);
// app.get('/api/user/', findUser);

app.post('/api/user/', createUser);
app.get ('/api/user/:userId', findUserById);
app.get ('/api/user', findUserByCredentials);
app.put ('/api/user/:userId', updateUser);

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

function createUser(req, res){
    var user = req.body;
    user._id = (new Date()).getTime() + "";
    users.push(user);
    res.send(user);
}

function findUserById(req, res){
    var userId = req.params['userId'];
    var user = users.find(function (user) {
        return user._id === userId;
    });
    res.send(user);
}

function findUserByCredentials(req, res){
    var username = req.query['username'];
    var password = req.query['password'];

    for(var u in users) {
        var user = users[u];
        if(user.username === username &&
            user.password === password) {
            res.json(user);                       //like .send but specifically for JSON
            return;
        }
    }
    res.sendStatus (404);  //user not found

}

function updateUser(req, res){  //userId, user
    var userId = req.params.userId;
    var user = req.body;

    for(var u in users){
        if(users[u]._id === userId){
            users[u] = user;
            res.sendStatus(200);  //update OK
            return;
        }
    }
    res.sendStatus(404);  //user not found
}