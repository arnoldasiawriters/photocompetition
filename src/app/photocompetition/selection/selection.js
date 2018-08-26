(function () {
    'use strict';

    angular
        .module('selection', ['services.utilities', 'resources.selection'])
        .controller('SelectionController', SelectionController)

    SelectionController.$inject = ['UtilitiesService', 'growl', 'SelectionService', '$window'];

    function SelectionController(UtilitiesService, growl, SelectionService, $window) {
        var ctrl = this;
        ctrl.menuItems = UtilitiesService.menuItems(2);
        ctrl.pageTitle = "BARAZA PHOTO COMPETITION - PHOTO SELECTION";
        ctrl.imagePaths = SelectionService.getSelectionImages();
        ctrl.submit = function () {
            growl.success('Your selection has been submitted successfully!', {
                title: 'Success Transaction', onclose: function () {
                    $window.location.reload();
                }
            });
        };       
    }
})();