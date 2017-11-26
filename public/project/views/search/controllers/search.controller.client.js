
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
                              currentUser,
                              $routeParams) {

        var model = this;
        model.rid = $routeParams.rid;

        model.createComment = createComment;
        model.getAllComments = getAllComments;
        // model.claim = claim;

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

    }  //detailController


})();
