
(function() {
    angular
        .module('WebAppMaker')
        .factory('userService', userService);

    function userService($http) {

        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            findUserByCredentials: findUserbyCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function createUser(user){
            user._id = (new Date()).getTime() + "";
            users.push(user);

        }

        function findUserById(userId){
            var url = '/api/user/' + userId;
            return $http.get(url)
                .then( function(response){
                    return response.data;       //unwrap data from response object; transparent to controller
                });

            // return users.find(function (user) {
            //     return user._id === userId;
            // });
        }

        function findUserByUsername(username){
            var user = users.find(function (user){
                return user.username === username;
            });
            if(typeof user === 'undefined')
                return null;
            else
                return user;
        }

        function findUserbyCredentials(username, password) {
            var url = '/api/user/?username=' + username + "&password=" + password;
            return $http.get(url)
                .then( function(response){
                    return response.data;       //unwrap data from response object; transparent to controller
                });
        }

        function updateUser(userId, user){
            for(var u in users){
                if(users[u]._id === userId){
                    users[u] = user;
                    console.log("user updated!");
                }
            }
        }

        function deleteUser(userId){
            var user = user.find( function(user){
                return user._id === userId;
            });
            var index = users.indexOf(user);
            users.splice(index, 1);
        }
    }

})();