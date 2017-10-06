
(function() {
    angular
        .module('WebAppMaker')
        .factory('userService', userService);

    function userService($http) {

        var api = {
            login: login,
            checkLoggedIn: checkLoggedIn,
            logOut: logOut,
            register: register,
            findUserByCredentials: findUserbyCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function login(username, password){
            var url = '/api/login';
            var credentials = {
                username: username,
                password: password
            };

            return $http.post(url, credentials)   // url, then data
                .then( function(response){
                    return response.data;
                });
        }

        function checkLoggedIn(){
            var url = '/api/loggedin';

            return $http.get(url)
                .then( function(response){
                    return response.data;
                });
        }

        function logOut(){
            var url = '/api/logout';

            return $http.post(url)
                .then( function(response){
                    return response.data;
                });
        }

        function register(user){
            var url = '/api/register';
            return $http.post(url, user)   // url, then data
                .then( function(response){
                    return response.data;
                });
        }

        function createUser(user){

            var url = '/api/user';
            return $http.post(url, user)   // url, then data
                .then( function(response){
                    return response.data;
                    });
        }

        function findUserById(userId){
            var url = '/api/user/' + userId;
            return $http.get(url)
                .then( function(response){
                    return response.data;       //unwrap data from response object; transparent to controller
                });
        }

        function findUserByUsername(username){
            var url = '/api/username/?username=' + username;

            return $http.get(url)
                .then( function(response){
                    return response.data;
                });
        }

        function findUserbyCredentials(username, password) {
            var url = '/api/user/?username=' + username + "&password=" + password;
            return $http.get(url)
                .then( function(response){
                    return response.data;
                });
        }

        function updateUser(userId, user){
            var url = '/api/user/' + userId;
            return $http.put(url, user)
                .then( function(response){
                    return response.data;
                });
        }

        function deleteUser(userId){
            var url = '/api/user/' + userId;
            return $http.delete(url)
                .then( function(response){
                    return response.data;
                });
        }
    }

})();