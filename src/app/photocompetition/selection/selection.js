(function () {
    'use strict';

    angular
    .module('selection',['services.utilities'])
    .controller('SelectionController', SelectionController)

    SelectionController.$inject = ['UtilitiesService', 'growl'];

    function SelectionController(UtilitiesService, growl) {
        var selection = this;
        selection.menuItems = UtilitiesService.menuItems(2);
        selection.pageTitle = "BARAZA PHOTO COMPETITION - PHOTO SELECTION";
    }
})();