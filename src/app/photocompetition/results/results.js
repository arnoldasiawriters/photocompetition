(function () {
    'use strict';

    angular
    .module('results', ['services.utilities'])
    .controller('ResultsController', ResultsController);

    ResultsController.$inject = ['UtilitiesService','growl'];
    function ResultsController(UtilitiesService, growl) {
        var results = this;
        results.menuItems = UtilitiesService.menuItems(4);
        results.pageTitle = "BARAZA PHOTO COMPETITION - RESULTS";       
    }
})();