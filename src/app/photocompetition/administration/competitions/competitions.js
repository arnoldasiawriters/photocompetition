(function () {
    'use strict';

    angular
    .module('competitions', ['services.utilities', 'admindirectives'])
    .controller('CompetitionsController', CompetitionsController);

    CompetitionsController.$inject = ['UtilitiesService', 'growl'];
    function CompetitionsController(UtilitiesService, growl) {
        var competitions = this;
        competitions.menuItems = UtilitiesService.menuItems(5);
            
        competitions.pageTitle = "BARAZA PHOTO COMPETITION - ADMINISTRATION";
    }
})();