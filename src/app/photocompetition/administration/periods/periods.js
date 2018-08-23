(function () {
    'use strict';

    angular
        .module('periods', ['resources.admin.periods', 'services.utilities'])
        .controller('PeriodsController', PeriodsController);

    PeriodsController.$inject = ['PeriodsService','UtilitiesService', 'growl'];
    function PeriodsController(PeriodsService, UtilitiesService, growl) {
        var periods = this;
        periods.menuItems = UtilitiesService.menuItems(5);
        periods.pageTitle = "BARAZA PHOTO COMPETITION - ADMINISTRATION (PERIODS)";
        periods.periods = PeriodsService.getPeriods();
        periods.btnAddHref = "#addPeriod";
    }
})();