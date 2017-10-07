
( function() {
    angular
        .module('WebAppMaker')
        .controller('adminUserController', adminUserController);

    function adminUserController(UserService){
        var model = this;

        (function init(){

            userService
                .findall()
                .then( function(users){
                    model.users = users;
                })
        })();
    }
})();