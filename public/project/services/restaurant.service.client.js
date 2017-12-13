
(function() {
    angular
        .module('FoodEngine')
        .factory('restaurantService', restaurantService);

    function restaurantService($http) {

        var api = {
            findRestById: findRestById,
            findAllRest: findAllRest,
            findRestForUser: findRestForUser,
            createRest: createRest,
            updateRest: updateRest,
            deleteRest: deleteRest
        };
        return api;

        function findRestById(restaurantId){

            var url = '/api/project/restaurant/' + restaurantId;

            return $http.get(url)
                .then( function(response){
                    return response.data;       //unwrap data from response object; transparent to controller
                });
        }

        function findAllRest(){

            var url = '/api/project/restaurant/';

            return $http.get(url)
                .then( function(response){
                    return response.data;
                });
        }

        function findRestForUser(userId){

            var url = '/api/project/' + userId+ '/restaurant';

            return $http.get(url)
                .then( function(response){
                    return response.data;
                });
        }

        function createRest(restaurantId, restaurant){

            var url = '/api/project/restaurant/' + restaurantId;

            return $http.post(url, restaurant)
                .then( function(response){
                    return response.data;
                });
        }

        function updateRest(restaurantId, restaurant){

            var url = '/api/project/restaurant/' + restaurantId;

            return $http.put(url, restaurant)
                .then( function(response){
                    return response.data;
                });
        }

        function deleteRest(restaurantId){

            var url = '/api/project/restaurant/' + restaurantId;

            return $http.delete(url, restaurant)
                .then( function(response){
                    return response.data;
                });
        }

    }

})();