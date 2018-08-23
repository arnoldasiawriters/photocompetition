(function () {
    'use strict';

    angular
    .module('competitions', ['services.utilities', 'admindirectives','resources.admin.competitions'])
    .controller('CompetitionsController', CompetitionsController);
    
    CompetitionsController.$inject = ['UtilitiesService', 'growl', 'CompetitionsService'];
    function CompetitionsController(UtilitiesService, growl, CompetitionsService) {
        var competitions = this;
        competitions.menuItems = UtilitiesService.menuItems(5);
        competitions.pageTitle = "BARAZA PHOTO COMPETITION - ADMINISTRATION (COMPETITIONS)";
        competitions.competitions = CompetitionsService.getCompetitions();
        competitions.btnAddHref = "#addCompetition";
    }
})();