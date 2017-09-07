
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
                .findUserByCredentials(username, password)
                .then(loginUser, loginError);
        }// login

        function loginUser(user){
            if(user !== null) {
                $location.url('/user/' + user._id);
            }
            else {model.message = "Something went wrong!"
            }
        }

        function loginError(user){
            model.message = "Username " + username + " not found";
        }

    }  //loginController

    function registerController($location,
                                userService) {

        var model = this;

        // event handler
        model.register = register;

        // event handler implementation
        function register(username, password, password2) {

            if (password !== password2){
                model.error = "Passwords must match!";
                return;
            }

            var found = userService.findUserByUsername(username);

            if(found !== null) {
                model.error = "Username is not available";
            } else {
                var user = {
                    username: username,
                    password: password
                };
                userService.createUser(user);
                $location.url('/user/' + user._id)
            }
        }
    } //registerController

    function profileController($location,
                               $routeParams,
                               userService) {

        // data
        var model = this;
        model.uid = $routeParams['uid'];

        model.updateProfile = updateProfile;

        (function init(){

            userService
                .findUserById(model.uid)         //return 'promise object'
                .then(renderUser);
        })();

        function renderUser(user){        //callback - when server provides response, run inner FUN
            model.user = user;
        }

        function updateProfile(user) {
            userService.updateUser(model.uid, user);
            $location.url('/user/'+model.uid);
        }

    }


})();
