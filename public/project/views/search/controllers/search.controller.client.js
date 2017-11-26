
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
        var comment = {};
        model.rid = $routeParams.rid;

        model.createComment = createComment;
        // model.getComments = getComments;
        // model.claim = claim;

        (function init() {

            searchService
                .getDetails(model.rid)
                .then(renderDetail, detailFail);

            function renderDetail(restDetail) {
                model.restaurant = restDetail;
            }

            function detailFail(response) {
                model.message = "Oops, can't get restaurant details.  Try again later."
            }

        })();

        function createComment(commentBody) {

            comment.body = commentBody;
            comment.user = currentUser._id;

            commentService
                .createComment(model.rid, comment)
                .then(
                    function(response){
                        console.log(response);
                    },
                    function(error){
                        console.log(error);
                    });

        }

        // function claim() {
        //
        // }

        // function getComments() {
        //     commentService.
        //         getCommentsForRest()
        //         .then();
        // }

    }  //detailController


})();
