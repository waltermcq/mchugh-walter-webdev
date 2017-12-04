
(function () {
    angular
        .module('FoodEngine')
        .controller('searchController', searchController)       //TODO rename this to restaurant controller(s)
        .controller('detailController', detailController);

    function searchController($location,
                              searchService) {

        var model = this;

        model.search = search;

        function search(searchText) {

            searchService
                .restSearch(searchText)
                .then(searchOk, searchFail);

            function searchOk(response) {
                model.restaurants = response.restaurants;
            }

            function searchFail(response) {
                model.message = "Oops, search failed! Try again later."
            }

            console.log("Query = " + searchText);
        } //search

    }  //searchController

    function detailController($location,
                              searchService,
                              commentService,
                              restaurantService,
                              currentUser,
                              $routeParams) {

        var model = this;
        model.rid = $routeParams.rid;

        model.createComment     = createComment;
        model.getAllComments    = getAllComments;
        model.editComment       = editComment;
        model.deleteComment     = deleteComment;
        model.claimRestaurant   = claimRestaurant;
        model.createReply       = createReply;
        model.updateReply       = updateReply;
        model.deleteReply       = deleteReply;

        (function init() {

            searchService
                .getDetails(model.rid)
                .then(renderDetail, detailFail);

            getAllComments();

            function renderDetail(restDetail) {
                model.restaurant = restDetail;
            }

            function detailFail(response) {
                model.message = "Oops, can't get restaurant details.  Try again later."
            }

        })();

        function createComment(commentBody) {

            var comment = {};
            comment.body = commentBody;
            comment.user = currentUser._id;

            commentService
                .createComment(model.rid, comment)
                .then(
                    getAllComments()
                    ,
                    function(error){
                        console.log(error);
                    });

            getAllComments();

        }

        function getAllComments() {

            commentService
                .findAllCommentsForRest(model.rid)
                .then(
                    function(comments) {
                        model.comments = comments;
                        console.log(comments);
                    },
                    function(error) {
                        model.message = "Error getting comments!";
                    }
                );
        }

        function editComment(commentId, comment) {

            commentService
                .updateComment(commentId, comment)
                .then(
                function(response) {
                    console.log(response);
                    model.message = "Comment updated!";
                    getAllComments();
                },
                function(error) {
                    model.message = "Error editing comment!";
                }
            );

        }

        function deleteComment(commentId) {

            commentService
                .deleteComment(commentId)
                .then(
                    function(response) {
                        console.log(response);
                        model.message = "Comment deleted!";
                        getAllComments();
                    },
                    function(error) {
                        model.message = "Error deleting comment!";
                    }
                );

        }

        function createReply(commentId, comment) {

            commentService
                .createReply(commentId, comment)
                .then(
                    function(response) {
                        console.log(response);
                        model.message = "Replied to comment!";
                        getAllComments();
                    },
                    function(error) {
                        model.message = "Error creating reply!";
                    }
                );

        }

        function updateReply(commentId, comment) {

            commentService
                .updateReply(commentId, comment)
                .then(
                    function(response) {
                        console.log(response);
                        model.message = "Replied to comment!";
                        getAllComments();
                    },
                    function(error) {
                        model.message = "Error creating reply!";
                    }
                );

        }

        function deleteReply(commentId) {

            commentService
                .deleteReply(commentId)
                .then(
                    function(response) {
                        console.log(response);
                        model.message = "Deleted reply!";
                        getAllComments();
                    },
                    function(error) {
                        model.message = "Error deleting reply!";
                    }
                );

        }

        function claimRestaurant(restaurantId) {

            var rest = {
                user: currentUser._id,
                restaurantId: restaurantId + ""
            };

            restaurantService
                .createRest(restaurantId, rest)
                .then(
                    function(response) {
                        console.log(response);  // TODO change location to offer edit page
                    },
                    function(error) {
                        model.message = "Error claiming restaurant!";
                    }
                );

        }


    }  //detailController


})();
