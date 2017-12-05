
(function() {
    angular
        .module('FoodEngine')
        .factory('commentService', commentService);

    function commentService($http) {

        var api = {
            findCommentById:        findCommentById,
            findAllCommentsForRest: findAllCommentsForRest,
            // findAllComments:        findAllComments,     TODO implement
            createComment:          createComment,
            updateComment:          updateComment,
            deleteComment:          deleteComment,
            //getReply:               getReply,
            createReply:            createReply,
            updateReply:            updateReply,
            deleteReply:            deleteReply
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

        function findAllCommentsForRest(restaurantId){

            var url = '/api/project/' + restaurantId + '/comment';

            return $http.get(url)
                .then( function(response){
                    return response.data;
                });
        }

        function updateComment(commentId, comment) {

            var url = '/api/project/comment/' + commentId;

            return $http.put(url, comment)
                .then( function(response){
                    return response.data;
                });

        }

        function deleteComment(commentId) {

            var url = '/api/project/comment/' + commentId;

            return $http.delete(url)
                .then( function(response){
                    return response.data;
                });

        }

        function createReply(commentId, reply) {

            var url = '/api/project/' + commentId + '/reply';

            return $http.post(url, reply)   // url, then data
                .then( function(response){
                    return response.data;
                });

        }

        function updateReply(commentId, reply) {

            var url = '/api/project/' + commentId + '/reply';

            return $http.put(url, reply)   // url, then data
                .then( function(response){
                    return response.data;
                });

        }

        function deleteReply(commentId) {

            var url = '/api/project/' + commentId + '/reply';

            return $http.delete(url)   // url, then data
                .then( function(response){
                    return response.data;
                });

        }

    }

})();