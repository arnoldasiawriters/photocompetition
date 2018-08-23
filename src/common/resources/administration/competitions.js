(function () {
    'use strict';

    angular
        .module('resources.admin.competitions', [])
        .service('CompetitionsService', CompetitionsService);

    function CompetitionsService() {
        var competitons = this;
        competitons.getCompetitions = function () {
            var competitions = ["Competition 1", "Competition 2", "Competition 3", "Competition 4", "Competition 5"];
            return competitions;
        };
    }
})();