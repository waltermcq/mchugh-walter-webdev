
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

// app.get('/api/user/', createUser);
// app.put('/api/user/:userId', updateUser);
// app.delete('/api/user/:userId', deleteUser);
// app.get('/api/user/', findUser);
app.get('/api/user/:userId', findUserById);

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

function findUserById(req, res){
    var userId = req.params['userId'];
    var user = users.find(function (user) {
        return user._id === userId;
    });
    res.send(user);
}
