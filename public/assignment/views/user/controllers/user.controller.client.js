
(function () {
    angular
        .module('WebAppMaker')
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
                // .findUserByCredentials(username, password)
                .then(loginUser, loginError);                   // .then(success, failure)

            function loginError(user){ // TODO implement improved error message
                model.message = "Username " + username + " not found";
            }
        }

        function loginUser(user){
            if(user !== null) {
                $location.url('/profile');
            }
            else {model.message = "Something went wrong!"
            }
        } //loginUser
    }  //loginController

    function registerController($location,
                                userService) {

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
                            .createUser(user)
                            .then( function(user) {
                                $location.url('/user/' + user._id)
                            });
                    }
                });
        } //register
    } //registerController

    function profileController($location,
                               $routeParams,
                               userService,
                               currentUser) {

        // data
        var model = this;
        // model.uid = $routeParams['uid'];
        model.uid = currentUser._id;


        model.updateProfile = updateProfile;
        model.deleteProfile = deleteProfile;

        (function init(){

            renderUser(currentUser);
            // userService
            //     .findUserById(model.uid)         //return 'promise object'
            //     .then(renderUser);
        })();

        function renderUser(user){        //callback - when server provides response, run inner FUN
            model.user = user;
        }

        function updateProfile(user) {
            userService
                .updateUser(model.uid, user)
                .then(function () {
                    model.message = "Profile updated successfully!";
                });
            // $location.url('/user/'+model.uid);
        }

        function deleteProfile(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/login');  //TODO add failure branch
                });
        }

    }


})();
