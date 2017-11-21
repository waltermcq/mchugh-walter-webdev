
(function() {
    angular
        .module('FoodEngine')
        .factory('searchService', searchService);

    function searchService($http) {

        var api = {
            restSearch: restSearch,
            getDetails: getDetails
        };
        return api;

        function restSearch(searchText) {

            var url = "https://developers.zomato.com/api/v2.1/search?entity_id=289&entity_type=city&q=" + searchText;
            var config = {
                headers: {
                    'Accept':'application/json',
                    'user-key' : "161cbd583023d9f219e9c154e58e6085"
                }
            };

            return $http.get(url, config)
                .then(function (response) {
                    return response.data;
                    // model.restaurants = response.data.restaurants;
                });
        }

        function getDetails(restaurantId) {

            var url = "https://developers.zomato.com/api/v2.1/restaurant?res_id=" + restaurantId;
            var config = {
                headers: {
                    'Accept':'application/json',
                    'user-key' : "161cbd583023d9f219e9c154e58e6085"
                }
            };

            $http.get(url, config)
                .then(function (response) {
                    return response.data;
                    //model.restDetail = response.data;
            });
        }
    }

})();