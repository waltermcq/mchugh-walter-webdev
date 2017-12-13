/**
 * Created by walter on 12/11/17.
 */
( function() {
    angular
        .module('FoodEngine')
        .controller('adminUserController', adminUserController)
        .controller('adminRestController', adminRestController);

    function adminUserController(userService){

        var model = this;
        model.deleteUser = deleteUser;
        model.updateUser = updateUser;

        (function init(){

            findAllUsers();

        })();

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(findAllUsers);

        }

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(findAllUsers);

        }

        function findAllUsers() {
            userService
                .findAllUsers()
                .then(function (users) {
                    model.users = users;
                })
        }

    } //adminUser

    function adminRestController(restaurantService) {

        var model = this;
        model.deleteRest = deleteRest;
        model.updateRest = updateRest;

        (function init(){

            findAllRestaurants();

        })();

        function deleteRest(restaurant) {
            userService
                .deleteRest(restaurant._id)
                .then( function(response) {
                    findAllRestaurants();
                    model.message="Restaurant deleted!"
                });

        }

        function updateRest(restaurant) {
            restaurantService
                .updateRest(restaurant._id, restaurant)
                .then( function(response) {
                    findAllRestaurants();
                    model.message="Restaurant updated!"
                });


        }

        function findAllRestaurants() {
            restaurantService
                .findAllRest()
                .then(function (restaurants) {
                    model.restaurants = restaurants;
                })
        }

    } //adminRest

})();