(function() {
    angular
        .module('WebAppMaker')
        .factory('flickrService', flickrService);

    function flickrService($http) {

        var api = {
            searchPhotos: searchPhotos
        };
        return api;

        var key = "your-flickr-key";
        var secret = "your-flickr-secret";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search &format=json&api_key=API_KEY&text=TEXT";

        // stuff in here?

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    } //flickrService

})();