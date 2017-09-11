
(function () {
    angular
        .module('WebAppMaker')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            // default / user routing
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
            .when('/user/:uid', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
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
            //TODO ADD DEFAULT OR ELSE
    }

})();
