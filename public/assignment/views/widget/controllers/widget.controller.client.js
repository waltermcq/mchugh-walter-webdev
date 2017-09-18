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
            widgetService
                .findWidgetsByPageId(model.pid)
                .then( function(widgets){
                    model.widgets = widgets;
                });
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

        // identify logic that should run at start
        (function init() {
            widgetService
                .findWidgetById(model.wgid)
                .then( function(widget){
                    model.widget = widget;
                });
        })();

        function updateWidget(widget) {
            widgetService
                .updateWidget(model.wgid, widget)
                .then( function(){
                    $location.url('/user/' + model.uid + '/website/' +model.wid + '/page/' + model.pid + '/widget');
                });
        }

        function deleteWidget() {
            widgetService
                .deleteWidget(model.wgid)
                .then( function(){
                $location.url('/user/' + model.uid + '/website/' +model.wid + '/page/' + model.pid + '/widget');
            });
        }

        function getWidgetUrlForType(widget) {  //TODO this executes before the init() sets the model widget and angular throws an error.
            var type = widget.type;
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
        model.createTextWidget    = createTextWidget;

        function createWidget(widget){
            widget.pageId = model.pid;  //TODO do this in the widget client service
            widgetService
                .createWidget(widget)
                .then( function(widget){
                    $location.url('/user/' + model.uid + '/website/' + model.wid + '/page/' + model.pid + '/widget/' + widget._id);
                });
        }

        function createHeaderWidget(){
            var headerWidget = {"type":"HEADING", "pageId": model.pid, "size":2, "text":"Lorem"};
            model.createWidget(headerWidget);
        }

        function createImageWidget(){
            var imageWidget = {"type":"IMAGE", "pageId": model.pid, "width":"100%", "url":"http://lorempixel.com/400/200/"};
            model.createWidget(imageWidget);
        }

        function createYouTubeWidget(){
            var youTubeWidget = {"type":"YOUTUBE", "pageId": model.pid, "width":"100%", "url": "https://youtu.be/AM2Ivdi9c4E"};
            model.createWidget(youTubeWidget);
        }

        function createHTMLWidget(){
            var hTMLWidget = {"type":"HTML", "pageId": model.pid, "text":"<p>Lorem ipsum</p>"};
            model.createWidget(hTMLWidget);
        }

        function createTextWidget(){
            var textWidget = {"type":"TEXT", "pageId": model.pid, "text":"Lorem ipsum"};
            model.createWidget(textWidget);
        }

    }

    function flickrImageSearchController($routeParams,
                                          widgetService,
                                          flickrService,
                                          $location) {

        var model  = this;
        model.uid  = $routeParams['uid'];
        model.wid  = $routeParams['wid'];
        model.pid  = $routeParams['pid'];
        model.wgid = $routeParams['wgid'];

        // event handlers for flickr search
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function searchPhotos(searchTerm) {

            flickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");  // this cleans up the JSON response from flickr
                    data = data.substring(0,data.length - 1);           // remove last parenthesis (cleaning)
                    data = JSON.parse(data);                            // parse string to JSON
                    model.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            console.log(photo);         // TODO the console has the original object, now we can use the guts to recreate the URL...?

            var url = "https://farm" +photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_b.jpg";

            var widget = { _id: model.wgid, widgetType: 'IMAGE', pageId: model.pid, url: url, width: '100%'}

        widgetService
            .updateWidget(model.wgid, widget)
            .then( function(){
                $location.url('/user/' + model.uid + '/website/' + model.wid + '/page/' + model.pid + '/widget/' + model.wgid);
            });
        }

    } //flickrImageSearchController
})();