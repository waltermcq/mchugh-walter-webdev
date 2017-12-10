
(function () {
    angular
        .module('FoodEngine')
        .controller('pubSearchController', pubSearchController)       //TODO rename this to restaurant controller(s)
        .controller('pubDetailController', pubDetailController);

    function pubSearchController($location,
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

    function pubDetailController($location,
                                 searchService,
                                 commentService,
                                 $routeParams) {

        var model = this;
        model.rid = $routeParams.rid;
        model.getAllComments    = getAllComments;

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
