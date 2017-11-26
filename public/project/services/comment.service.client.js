
(function() {
    angular
        .module('FoodEngine')
        .factory('commentService', commentService);

    function commentService($http) {

        var api = {
            createComment: createComment,
            findCommentById: findCommentById
        };
        return api;

        function createComment(restaurantId, comment){

            var url = '/api/project/' + restaurantId + '/comment';

            return $http.post(url, comment)   // url, then data
                .then( function(response){
                    return response.data;
                });
        }

        function findCommentById(commentId){

            var url = '/api/project/comment/' + commentId;

            return $http.get(url)
                .then( function(response){
                    return response.data;       //unwrap data from response object; transparent to controller
                });
        }

    }

})();