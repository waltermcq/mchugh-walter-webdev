
(function() {

    angular
        .module('pocApp', [])
        .controller('pocAppController', pocAppController);

    function pocAppController($http) {

        var model = this;

        model.search = search;
        model.getDetails = getDetails;

        // event handlers
        function search(searchText) {

            var url = "https://developers.zomato.com/api/v2.1/search?entity_id=289&entity_type=city&q=" + searchText; //friendly%20toast
            var config = {
                    headers: {
                        'Accept':'application/json',
                        'user-key' : "161cbd583023d9f219e9c154e58e6085"
                    }
            };

            $http.get(url, config)
                .then(function (response) {
                    model.restaurants = response.data.restaurants;
                });
        }

        function getDetails(restaurantId) {

            var url = "https://developers.zomato.com/api/v2.1/restaurant?res_id=" + restaurantId; //friendly%20toast
            var config = {
                headers: {
                    'Accept':'application/json',
                    'user-key' : "161cbd583023d9f219e9c154e58e6085"
                }
            };

            $http.get(url, config)
                .then(function (response) {

                    model.restDetail = response.data;
                    console.log(response.data);
                });
        }

    } //pocAppController


})();