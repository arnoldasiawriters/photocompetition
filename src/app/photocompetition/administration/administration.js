(function () {
    'use strict';

    angular
        .module('administration', ['services.utilities'])
        .controller('AdministrationController', AdministrationController);

    AdministrationController.$inject = ['UtilitiesService', 'growl'];
    function AdministrationController(UtilitiesService, growl) {
        var administration = this;
        administration.menuItems = UtilitiesService.menuItems(5);
        administration.pageTitle = "BARAZA PHOTO COMPETITION - ADMINISTRATION";
    }
})();