(function () {
    'use strict';

    angular
    .module('resources.admin.periods', [])
    .service('PeriodsService', PeriodsService);

    function PeriodsService() {
        var periods = this;
        periods.getPeriods = function () {
            var periods = ["2014", "2015", "2016", "2017", "2018"];
            return periods;
        };
    }
})();