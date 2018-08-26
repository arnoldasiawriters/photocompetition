(function () {
    'use strict';

    angular
        .module('resources.admin.competitions', [])
        .service('CompetitionsService', CompetitionsService);

    CompetitionsService.$inject = ['$q'];
    function CompetitionsService($q) {
        var svc = this;
        svc.error = { message: "" };
        svc.competitions = ["Competition 1", "Competition 2", "Competition 3", "Competition 4", "Competition 5"];
        svc.getCompetitions = function () {
            return svc.competitions;
        };

        svc.addCompetition = function (competition) {
            var deferred = $q.defer();
            if (_.includes(svc.competitions, competition)) {
                svc.error.message = "Competition already registered!";
                deferred.reject(svc.error);
            } else if (competition.trim().length <= 0) {
                svc.error.message = "Provided competition is empty!";
                deferred.reject(svc.error);
            } else {
                svc.competitions.push(competition);
                deferred.resolve(svc.competitions);
            }
            return deferred.promise;
        };

        svc.editCompetition = function (competitionOld, competitionNew) {
            var deferred = $q.defer();
            if (competitionOld == competitionNew) {
                svc.error.message = "You have not edited the competition!";
                deferred.reject(svc.error);
            } else if (_.includes(svc.competitions, competitionNew)) {
                svc.error.message = "Provided competition is already registered!";
                deferred.reject(svc.error);
            } else if (competitionNew.trim().length <= 0) {
                svc.error.message = "Provided competition is empty!";
                deferred.reject(svc.error);
            } else {
                for (var i = 0; i < svc.competitions.length; i++) {
                    if (svc.competitions[i] == competitionOld) {
                        svc.competitions[i] = svc.competitions[i].replace(competitionOld, competitionNew);
                    }
                }
                deferred.resolve(svc.competitions);
            }
            return deferred.promise;
        };

        svc.removeCompetition = function (competition) {
            var deferred = $q.defer();
            if (_.includes(svc.competitions, competition)) {
                _.pull(svc.competitions, competition);
                deferred.resolve(svc.competitions);
            } else {
                svc.error.message = "Period not available!";
                deferred.reject(svc.error);
            }
            return deferred.promise;
        };
    }
})();