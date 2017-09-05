
(function () {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController)
        .controller('registerController', registerController)
        .controller('profileController', profileController);

    function loginController($location,
                             userService) {

        var model = this;

        // event handler
        model.login = login;

        // event handler implementation
        function login(username, password) {
            var found = userService.findUserByCredentials(username, password);
            if(found !== null) {
                $location.url('/user/' + found._id);
            } else {
                model.message = "Username " + username + " not found";
            }
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
            model.user = userService.findUserById(model.uid);
        })();

        function updateProfile(user) {
            userService.updateUser(model.uid, user);
            $location.url('/user/'+model.uid);
        }

    }


})();
