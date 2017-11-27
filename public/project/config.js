
(function() {
    angular
        .module('FoodEngine')
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            // search
            .when('/', {
                templateUrl: '/project/views/search/templates/search.view.client.html',
                controller: 'searchController',
                controllerAs: 'model'
            })
            .when('/search', {
                templateUrl: '/project/views/search/templates/search.view.client.html',
                controller: 'searchController',
                controllerAs: 'model'
            })
            .when('/detail/:rid', {
                templateUrl: '/project/views/search/templates/detail.view.client.html',
                controller: 'detailController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            // user
            .when('/login', {
                templateUrl: '/project/views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: '/project/views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/profile', {
                templateUrl: '/project/views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn      // whatever checkLoggedIn returns (e.g. user) becomes an injectable object 'currentUser'
                }
            })
            // .when('/admin/admin', {
            //     templateUrl: '/project/views/admin/templates/admin-user.view.client.html',
            //     controller: 'adminUserController',
            //     controllerAs: 'model',
            //     resolve: {
            //         currentUser: checkAdmin
            //     }
            // })
            .otherwise({
                redirectTo: "/search"
            });
    } //config

    function checkLoggedIn($q, $location, userService){  // $timeout, $rootScope
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then( function(currentUser){
                if(currentUser === '0'){
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkAdmin($q, $location, userService){  // $timeout, $rootScope
        var deferred = $q.defer();
        userService
            .checkAdmin()
            .then( function(currentUser){
                if(currentUser === '0'){
                    deferred.resolve({});
                    $location.url('/login')
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

})();
