
(function() {
    angular
        .module('WebAppMaker')
        .factory('websiteService', websiteService);

    function websiteService($http) {

        var api = {
            findWebsiteById: findWebsiteById,
            findWebsitesByUser: findWebsitesByUser,
            createWebsite: createWebsite,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function findWebsiteById(websiteId){

            var url = '/api/website/' + websiteId;

            return $http.get(url)
                .then( function(response){
                    return response.data;
                })
        }

        function createWebsite(website){

            var userId = website.developerId;
            var url = "/api/user/" + userId + "/website";

            return $http.post(url, website)
                .then( function(response){
                    return response.data;
                });
        }

        function updateWebsite(websiteId, website){

            var url = '/api/website/' + websiteId;

            return $http.put(url, website)
                .then( function(response){
                    return response.data;
                });
        }

        function deleteWebsite(websiteId){
            var url = '/api/website/' + websiteId;

            return $http.delete(url)
                .then( function(response){
                    return response.data;
                });
        }

        function findWebsitesByUser(userId) {

            var url = "/api/user/" + userId + '/website';

            return $http.get(url)
                .then( function(response){
                    return response.data;
                });
        }
    }

})();