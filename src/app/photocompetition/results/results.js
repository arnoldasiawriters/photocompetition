(function () {
    'use strict';

    angular
    .module('results', ['services.utilities', 'resources.results','resources.admin.categories'])
    .controller('ResultsController', ResultsController);

    ResultsController.$inject = ['UtilitiesService','growl', 'ResultsService', 'CategoriesService'];
    function ResultsController(UtilitiesService, growl, ResultsService, CategoriesService) {
        var results = this;
        results.menuItems = UtilitiesService.menuItems(4);
        results.pageTitle = "BARAZA PHOTO COMPETITION - RESULTS";
        results.imagePaths = ResultsService.getResultsImages();
        results.categories = CategoriesService.getCompetitionCats();
    }
})();