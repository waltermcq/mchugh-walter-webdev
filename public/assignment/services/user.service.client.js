
(function() {
    angular
        .module('WebAppMaker')
        .factory('userService', userService);

    function userService($http) {

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