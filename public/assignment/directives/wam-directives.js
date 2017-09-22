// TODO implement

(function(){
    angular
        .module("wamDirectives", [])
        .directive("wdDraggable", wdDraggable);

    function wdDraggable($http){
        return {
            link: linkFunction
        }

        function linkFunction(scope, element, attrs) {         // element from the DOM; also can include attrs
            $(element).sortable({                              // grab element with jquery

                start: function(event, ui) {
                    ui.item.initialIndex = ui.item.index();
                },

                stop: function(event, ui) {
                    var widgetId = ui.item.attr("id");

                    var index1 = ui.item.initialIndex;      // initial widget position
                    var index2 = ui.item.index();           // end (reordered) position
                    var pageId = scope.model.pid;

                    var url = "/page/" + pageId + "/widget?start=" + index1 + "&end=" + index2;

                    $http.put(url)
                        .then( function(){
                            console.log('widget reorder call returned');
                        },
                        function(error){
                            console.log('widget reorder server/call error');
                        });
                }
            });
        }
    }
})();