
(function() {
    angular
        .module('WebAppMaker')
        .factory('flickrService', flickrService);

    function flickrService($http) {

        var key = "11e1298028d3064101c4f5c589e45c2b";
        var secret = "16d35d77195c6989";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        var api = {
            searchPhotos: searchPhotos
        };
        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }
    } //flickrService

})();