
(function () {
    angular
        .module('FoodEngine')
        .controller('loginController', loginController)
        .controller('registerController', registerController)
        .controller('profileController', profileController);

    function loginController($location,
                             userService) {

        var model = this;
        model.login = login;

        // event handler implementation
        function login(username, password) {

            userService
                .login(username, password)
                .then(loginUser, loginError);                   // .then(success, failure)

            function loginError(user){ //
                model.message = "Username " + username + " not found or password incorrect!";
            }
        }

        function loginUser(user){
            if(user !== null) {
                $location.url('/profile');
            }
            else { model.message = "Something went wrong!"
            }
        } //loginUser
    }  //loginController

    function registerController($location,
                                userService,
                                $rootScope) {

        var model = this;

        // event handler
        model.register = register;

        // event handler implementation
        function register(username, password, password2) {

            if (password !== password2){                    //TODO more robust username and password checking
                model.error = "Passwords must match!";
                return;
            }

            userService
                .findUserByUsername(username)
                .then( function(response){
                    if(response === '1'){
                        model.error = "Username not available; try another.";
                    }
                    else {

                        var user = {
                            username: username,
                            password: password
                        };
                        userService
                            .register(user)
                            .then( function() {
                                var user = response.data;
                                $rootScope.currentUser = user;  // this breaks pw1 = pw2 for some weird reason
                                $location.url('/profile');
                            });
                    }
                });
        } //register
    } //registerController

    function profileController($location,
                               userService,
                               restaurantService,
                               commentService,
                               currentUser) {

        var model = this;
        model.uid = currentUser._id;

        model.updateProfile         = updateProfile;
        model.unregister            = unregister;
        model.logOut                = logOut;
        model.renderUser            = renderUser;
        model.findClaimedRestaurant = findClaimedRestaurant;
        model.getComments           = getComments;

        (function init(){

            renderUser(currentUser);
            getComments(currentUser);

            if(currentUser.roles.indexOf('SELLER') > -1) {
                findClaimedRestaurant(currentUser._id);
            }

        })();

        function renderUser(user) {
            model.user = user;
        }

        function findClaimedRestaurant() {

            restaurantService
                .findRestForUser(currentUser._id)
                .then(function(response) {
                    model.restaurant = response;
                    // console.log("restaurant id: " + model.restaurant.restaurantId);
                });

        }

        function getComments(currentUser) {

            commentService
                .findAllCommentsByUser(currentUser._id)
                .then( function(response){
                    model.comments = response;
                    console.log(response);
                });
        }

        function updateProfile(user) {
            userService
                .updateUser(model.uid, user)
                .then(function () {
                    model.message = "Profile updated successfully!";    //TODO add failure branch
                });
        }

        function unregister() {
            userService
                .unregister();
            $location.url('/login');
            // .then(function () {
            //     $location.url('/login');  //TODO add failure branch
            // }, function(error) {
            //     model.message = "Profile unregister error!";
            // });
        }

        function logOut(){
            userService
                .logOut()
                .then( function(){
                    $location.url('/login');
                });
        }

    }


})();
