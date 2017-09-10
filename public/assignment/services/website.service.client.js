
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
            website._id = (new Date()).getTime() + "";
            website.created = new Date();
            website.updated = new Date();
            websites.push(website);                          //push to current array of sites

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