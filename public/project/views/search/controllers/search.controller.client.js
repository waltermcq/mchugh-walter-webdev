
(function () {
    angular
        .module('FoodEngine')
        .controller('searchController', searchController)
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

            console.log("Query = " + queryText);
        } //search

    }  //searchController

    function detailController($location,
                              searchService,
                              $routeParams) {

        var model = this;
        model.rid = $routeParams.rid;
        model.getComments = getComments;

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

        // function getComments() {
        //     commentService.
        //         getCommentsForRest()
        //         .then();
        // }

    }  //detailController


})();
