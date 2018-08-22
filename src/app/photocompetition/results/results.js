(function () {
    'use strict';

    angular
    .module('results', ['services.utilities', 'resources.results'])
    .controller('ResultsController', ResultsController);

    ResultsController.$inject = ['UtilitiesService','growl', 'ResultsService'];
    function ResultsController(UtilitiesService, growl, ResultsService) {
        var results = this;
        results.menuItems = UtilitiesService.menuItems(4);
        results.pageTitle = "BARAZA PHOTO COMPETITION - RESULTS";
        results.imagePaths = ResultsService.getResultsImages();
    }
})();