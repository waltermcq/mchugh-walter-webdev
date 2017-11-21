
(function () {
    angular
        .module('FoodEngine')
        .controller('searchController', searchController)
        .controller('detailController', detailController);

    function searchController($location,
                              searchService) {

        var model = this;

        model.search = search;
        model.renderSearch = renderSearch;
        model.queryText = "";

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

        function renderSearch() {
            console.log('renderSearch!');
        }

    }  //searchController

    function detailController($location) { // ,searchService

        var model = this;

    }  //detailController


})();
