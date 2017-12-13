
(function() {
    angular
        .module('FoodEngine')
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            // public/anon search
            .when('/', {
                templateUrl: '/project/views/pubsearch/templates/pubsearch.view.client.html',
                controller: 'pubSearchController',
                controllerAs: 'model'
            })
            .when('/pub/search', {
                templateUrl: '/project/views/pubsearch/templates/pubsearch.view.client.html',
                controller: 'pubSearchController',
                controllerAs: 'model'
            })
            .when('/pub/detail/:rid', {
                templateUrl: '/project/views/pubsearch/templates/pubdetail.view.client.html',
                controller: 'pubDetailController',
                controllerAs: 'model'
            })
            // logged in user search
            .when('/search', {
                templateUrl: '/project/views/search/templates/search.view.client.html',
                controller: 'searchController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
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
            // site administration
            .when('/admin', {
                templateUrl: '/project/views/admin/templates/admin-home.view.client.html',
                // controller: 'adminHomeController',
                // controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/user', {
                templateUrl: '/project/views/admin/templates/admin-user.view.client.html',
                controller: 'adminUserController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/restaurant', {
                templateUrl: '/project/views/admin/templates/admin-rest.view.client.html',
                controller: 'adminRestController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .otherwise({
                redirectTo: '/'
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
