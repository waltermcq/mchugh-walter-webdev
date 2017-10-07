
( function() {
    angular
        .module('WebAppMaker')
        .controller('adminUserController', adminUserController);

    function adminUserController(userService){
        var model = this;

        (function init(){

            userService
                .findAllUsers()
                .then( function(users){
                    model.users = users;
                })
        })();
    } //adminUser

})();