
(function () {
    angular
        .module('WebAppMaker')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            // default and user routing
            .when('/', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })
            .when('default', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })
            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn      // whatever checkLoggedIn returns (e.g. user) becomes an injectable object 'currentUser'
                }
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/admin', {
                templateUrl: 'views/admin/templates/admin.view.client.html',
                // controller: 'adminController',
                // controllerAs: 'model'
                resolve: {
                    currentUser: checkAdmin
                }
            })

            // website routing
            .when('/user/:uid/website', {
                templateUrl: 'views/website/templates/website-list.view.client.html',
                controller: 'websiteListController',
                controllerAs: 'model'
            })
            .when('/user/:uid/website/new', {
                templateUrl: 'views/website/templates/website-new.view.client.html',
                controller: 'websiteNewController',
                controllerAs: 'model'
            })
            .when('/user/:uid/website/:wid', {
                templateUrl: 'views/website/templates/website-edit.view.client.html',
                controller: 'websiteEditController',
                controllerAs: 'model'
            })

            // page routing
            .when('/user/:uid/website/:wid/page', {
                templateUrl: 'views/page/templates/page-list.view.client.html',
                controller: 'pageListController',
                controllerAs: 'model'
            })
            .when('/user/:uid/website/:wid/page/new', {
                templateUrl: 'views/page/templates/page-new.view.client.html',
                controller: 'pageNewController',
                controllerAs: 'model'
            })
            .when('/user/:uid/website/:wid/page/:pid', {
                templateUrl: 'views/page/templates/page-edit.view.client.html',
                controller: 'pageEditController',
                controllerAs: 'model'
            })

            // widget routing
            .when('/user/:uid/website/:wid/page/:pid/widget', {
                templateUrl: 'views/widget/templates/widget-list.view.client.html',
                controller: 'widgetListController',
                controllerAs: 'model'
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/new', {
                templateUrl: 'views/widget/templates/widget-chooser.view.client.html',
                controller: 'widgetChooserController',
                controllerAs: 'model'
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/:wgid', {
                templateUrl: 'views/widget/templates/widget-edit.view.client.html',
                controller: 'widgetEditController',
                controllerAs: 'model'
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/:wgid/search', {
                templateUrl: 'views/widget/templates/widget-flickr-search.view.client.html',
                controller: 'flickrImageSearchController',
                controllerAs: 'model'
            })
            .otherwise({
                redirectTo: "/login"
            });
    }

    function checkLoggedIn($q, $location, userService){  // $timeout, $http, $rootScope
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

    function checkAdmin($q, $location, userService){  // $timeout, $http, $rootScope
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
