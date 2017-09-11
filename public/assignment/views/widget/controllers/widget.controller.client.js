(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetListController', widgetListController)
        .controller('widgetEditController', widgetEditController)
        .controller('widgetChooserController', widgetChooserController)
        .controller('flickrImageSearchController', flickrImageSearchController);

    function widgetListController($sce,
                                  $routeParams,
                                  widgetService) {

        var model = this;
        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];

        // bind data to this instance of controller
        model.trustThisContent = trustThisContent;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.getWidgetUrlForType = getWidgetUrlForType;

        (function init(){
            model.widgets = widgetService.findWidgetsByPageId(model.pid);
        })();

        // sign content to make angular happy when displaying exogenous HTML
        function trustThisContent(html) {
            // in theory, requires diligence to scrub any unsafe content
            return  $sce.trustAsHtml(html)
        }

        function getYouTubeEmbedUrl(youTubeLink) {
            var embedUrl = 'https://www.youtube.com/embed/';
            var youTubeLinkParts = youTubeLink.split('/');
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl += id;
            console.log(embedUrl);
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function getWidgetUrlForType(type) {
            return 'views/widget/templates/widget-'+type.toLowerCase()+'.view.client.html';
        }
    } // widgetListController

    function widgetEditController($location,
                                  $routeParams,
                                  widgetService) {

        var model  = this;
        model.uid  = $routeParams['uid'];
        model.wid  = $routeParams['wid'];
        model.pid  = $routeParams['pid'];
        model.wgid = $routeParams['wgid'];

        // event handlers
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        model.getWidgetUrlForType = getWidgetUrlForType;
        // model.createWidget = createWidget;

        // identify logic that should run at start
        (function init() {
            model.widget = widgetService.findWidgetById(model.wgid)
        })();

        // TESTING ONLY
        // function createWidget(widget){
        //     var pageId = model.pid;
        //     var newId = model.pid + model.wid;
        //     widget._id = newId.toString();
        //     widgetService.createWidget(pageId, widget);
        //     $location.url('/user/' + model.uid + '/website/' + model.wid + '/page/' + model.pid + '/widget/' + widget._id); // this URL is wrong
        // }

        function updateWidget(widget) {
            widgetService.updateWidget(model.wgid, widget);
            $location.url('/user/' + model.uid + '/website/' +model.wid + '/page/' + model.pid + '/widget');
        }

        function deleteWidget() {
            widgetService.deleteWidget(model.wgid);
            $location.url('/user/' + model.uid + '/website/' +model.wid + '/page/' + model.pid + '/widget');
        }

        function getWidgetUrlForType(type) {
            return 'views/widget/templates/widget-'+type.toLowerCase()+'-edit.view.client.html';
        }
    }

    function widgetChooserController($routeParams,
                                     widgetService,
                                     $location) {

        var model = this;
        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];

        // event handlers for widget type link click
        model.createWidget        = createWidget;
        model.createHeaderWidget  = createHeaderWidget;
        model.createImageWidget   = createImageWidget;
        model.createYouTubeWidget = createYouTubeWidget;
        model.createHTMLWidget    = createHTMLWidget;

        function createWidget(widget){
            var pageId = model.pid;
            var newId = new Date();
            widget._id = newId.toString();
            widgetService.createWidget(pageId, widget);
            $location.url('/user/' + model.uid + '/website/' + model.wid + '/page/' + model.pid + '/widget/' + widget._id);
        }

        function createHeaderWidget(){
            var headerWidget = {"_id": "", "widgetType":"HEADING", "pageId": model.pid, "size":2, "text":"Lorem"};
            model.createWidget(headerWidget);
        }

        function createImageWidget(){
            var imageWidget = {"_id": "", "widgetType":"IMAGE", "pageId": model.pid, "width":"100%", "url":"http://lorempixel.com/400/200/"};
            model.createWidget(imageWidget);
        }

        function createYouTubeWidget(){
            var youTubeWidget = {"_id": "", "widgetType":"YOUTUBE", "pageId": model.pid, "width":"100%", "url": "https://youtu.be/AM2Ivdi9c4E"};
            model.createWidget(youTubeWidget);
        }

        function createHTMLWidget(){
            var hTMLWidget = {"_id": "", "widgetType":"HTML", "pageId": model.pid, "text":"<p>Lorem ipsum</p>"};
            model.createWidget(hTMLWidget);
        }

    }

    function flickrImageSearchController($routeParams,
                                          widgetService,
                                          $location) {

        var model = this;
        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];

        // event handlers for widget type link click
        model.doThis = doThis;
        model.searchPhotos = searchPhotos;

        (function init(){
            model.searchText = {};
        })();

        function searchPhotos(searchText) {

        }

    } //flickrImageSearchController
})();