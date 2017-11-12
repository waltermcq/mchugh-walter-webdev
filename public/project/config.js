
(function() {
    angular
        .module('FoodEngine')
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: '/project/views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/login', {
                templateUrl: '/project/views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/profile', {
                templateUrl: '/project/views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
                // , resolve: {
                //     loggedIn: checkLoggedIn (or something)
                // }
            });
    } //config

})();
