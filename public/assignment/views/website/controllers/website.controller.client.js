
(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteListController', websiteListController)
        .controller('websiteNewController', websiteNewController)
        .controller('websiteEditController', websiteEditController);

    function websiteListController($routeParams,
                                   websiteService) {

        var model = this;
        model.uid = $routeParams['uid'];

        // identify logic that should run at start
        (function init() {
            websiteService
                .findWebsitesByUser(model.uid)
                .then( function(response){
                    model.websites = response;
                });
        })();
    }

    function websiteNewController($routeParams,
                                  websiteService,
                                  $location) {

        var model = this;
        model.uid = $routeParams['uid'];

        // event handler for 'create' button
        model.createWebsite = createWebsite;

        // identify logic that should run at start
        // feeds left hand side of template i.e. list
        (function init() {
            model.websites = websiteService.findWebsitesByUser(model.uid);
        })();

        function createWebsite(website){
            website.developerId = model.uid;
            websiteService
                .createWebsite(website)
                .then( function(site){
                    $location.url('/user/' + site.developerId + '/website');
                });

        }
    } // websiteNewController

    function websiteEditController($routeParams,
                                   websiteService,
                                   $location) {

        var model = this;
        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];

        // event handlers
        model.createWebsite = createWebsite;
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        // identify logic that should run at start
        // feeds left hand side of template i.e. list
        (function init() {
            model.websites = websiteService.findWebsitesByUser(model.uid);
            model.website = websiteService.findWebsiteById(model.wid)
        })();

        function createWebsite(website){
            website.developerId = model.uid;
            websiteService.createWebsite(website);
            $location.url('/user/' + model.uid + '/website');
        }

        function updateWebsite(website) {
            websiteService.updateWebsite(model.wid, website);
            $location.url('/user/'+model.uid+'/website');
        }

        function deleteWebsite(wid) {
            websiteService.deleteWebsite(wid);
            $location.url('/user/'+model.uid+'/website');
        }
    } //websiteEditController
})();
