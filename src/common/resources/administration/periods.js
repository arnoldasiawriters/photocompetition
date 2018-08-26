(function () {
    'use strict';

    angular
    .module('resources.admin.periods', [])
    .service('PeriodsService', PeriodsService);
    PeriodsService.$inject = ['$q'];
    function PeriodsService($q) {
        var svc = this;
        svc.error = { message: "" };
        svc.periods = ["2014", "2015", "2016", "2017", "2018"];
        svc.getPeriods = function () {
            return svc.periods;
        };

        svc.addPeriod = function (period) {
            var deferred = $q.defer();
            if (_.includes(svc.periods, period)) {
                svc.error.message = "Period already registered!";
                deferred.reject(svc.error);
            } else if (period.trim().length <= 0) {
                svc.error.message = "Provided period is empty!";
                deferred.reject(svc.error);
            }  else {
                svc.periods.push(period);
                deferred.resolve(svc.periods);
            }
            return deferred.promise;
        };

        svc.editPeriod = function (periodOld, periodNew) {
            var deferred = $q.defer();
            if (periodOld == periodNew) {
                svc.error.message = "You have not edited the period!";
                deferred.reject(svc.error);
            } else if (_.includes(svc.periods, periodNew)) {
                svc.error.message = "Provided period is already registered!";
                deferred.reject(svc.error);
            } else if (periodNew.trim().length <= 0) {
                svc.error.message = "Provided period is empty!";
                deferred.reject(svc.error);
            } else {
                for (var i = 0; i < svc.periods.length; i++) {
                    if(svc.periods[i] == periodOld) {
                        svc.periods[i] = svc.periods[i].replace(periodOld, periodNew);
                    }
                }
                deferred.resolve(svc.periods);
            }
            return deferred.promise;
        };

        svc.removePeriod = function (period) {
            var deferred = $q.defer();
            if (_.includes(svc.periods, period)) {
                _.pull(svc.periods, period);
                deferred.resolve(svc.periods);
            } else {
                svc.error.message = "Period not available!";
                deferred.reject(svc.error);
            }
            return deferred.promise;
        };
    }
})();