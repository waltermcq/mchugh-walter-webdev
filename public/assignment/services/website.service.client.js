
(function() {
    angular
        .module('WebAppMaker')
        .factory('websiteService', websiteService);

    function websiteService($http) {

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        var api = {
            findWebsiteById: findWebsiteById,
            findWebsitesByUser: findWebsitesByUser,
            createWebsite: createWebsite,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function findWebsiteById(websiteId){
            return websites.find(function (website) {
                return website._id === websiteId;
            });
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
            for(w in websites){
                if(websites[w]._id === websiteId){
                    websites[w] = website;
                }
            }
        }

        function deleteWebsite(websiteId){
            var website = websites.find( function(website) {
                return website._id === websiteId;
            });
            var index = websites.indexOf(website);
            websites.splice(index, 1);
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