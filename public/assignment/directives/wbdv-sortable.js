(function(){
    angular
        .module("WebAppMaker")
        .directive("wdDraggable", wdDraggable);

    function wdDraggable() {
        return {
            link: linkFunction
        }

        function linkFunction(scope, element) {
            $(element).
            sortable({
                stop: function(event, ui) {
                    var widgetId = ui.item.attr("id");
                    console.log("ID: " + widgetId);
                    console.log("Start position: " + ui.item.initialIndex);
                    console.log("New position: " + ui.item.index())

                    //You need to update the server here.
                },
                start: function(event, ui) {
                    ui.item.initialIndex = ui.item.index();
                }});
        }
    }
})();