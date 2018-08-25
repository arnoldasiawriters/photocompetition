(function () {
    'use strict';

    angular
        .module('selection', ['services.utilities', 'resources.selection'])
        .controller('SelectionController', SelectionController)

    SelectionController.$inject = ['UtilitiesService', 'growl', 'SelectionService', '$window'];

    function SelectionController(UtilitiesService, growl, SelectionService, $window) {
        var selection = this;
        selection.menuItems = UtilitiesService.menuItems(2);
        selection.pageTitle = "BARAZA PHOTO COMPETITION - PHOTO SELECTION";
        selection.imagePaths = SelectionService.getSelectionImages();
        selection.submit = function () {
            growl.success('Your selection has been submitted successfully!', {
                title: 'Success Transaction', onclose: function () {
                    $window.location.reload();
                }
            });
        };       
    }
})();