

(function () {
    angular
        .module('WebAppMaker')
        .controller('pageNewController', pageNewController)
        .controller('pageListController', pageListController)
        .controller('pageEditController', pageEditController);

    function pageNewController($routeParams,
                               pageService,
                               $location) {

        var model = this;
        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];

        // event handler for 'create' button
        model.createPage = createPage;

        function createPage(page){
            page.websiteId = model.wid;
            pageService
                .createPage(page)
                .then( function(){
                    $location.url('/user/' + model.uid + '/website/' + model.wid + '/page');
                });
        }
    }

    function pageListController($routeParams, pageService) {

        var model = this;
        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];

        (function init() {
            pageService
                .findPageByWebsiteId(model.wid)
                .then(renderPages);
        })();

        function renderPages(pages){
            model.pages = pages;
        }

    }

    function pageEditController($routeParams,
                                pageService,
                                $location) {

        var model = this;
        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];

        // event handlers
        model.createPage = createPage;
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        // identify logic that should run at start
        (function init() {
            pageService
                .findPageById(model.pid)
                .then(function(page){
                    model.page = page;
                });
        })();

        function createPage(page){
            page.websiteId = model.wid;
            pageService.
                createPage(page)
                .then( function(){
                    $location.url('/user/' + model.uid + '/website/' +model.wid + '/page');
                });
        }

        function updatePage(page) {
            pageService
                .updatePage(model.pid, page)
                .then( function(){
                    $location.url('/user/' + model.uid + '/website/' +model.wid + '/page');
                });
        }

        function deletePage(pid) {
            pageService
                .deletePage(pid)
                .then( function(){
                    $location.url('/user/' + model.uid + '/website/' +model.wid + '/page');
                });
        }
    }

})();
