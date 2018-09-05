(function () {
    'use strict';

    angular
        .module('resources.admin.periods', [])
        .service('PeriodsService', PeriodsService);
    PeriodsService.$inject = ['$q', 'UtilitiesService'];
    function PeriodsService($q, UtilitiesService) {
        var svc = this;
        var periodsList = null;
        svc.error = { message: "" };

        /**
         * Function for fetching all periods in periods model
         */
        svc.fetchAll = function () {
            var deferred = $q.defer();
            periodsList = [];
            UtilitiesService
                .getListItems("periods")
                .then(function (periods) {
                    periods = periods.data;
                    _.forEach(periods, function (v, k) {
                        var period = {};
                        period.id = v.id;
                        period.name = v.name;
                        periodsList.push(period);
                    });
                    deferred.resolve(periodsList);
                })
                .catch(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };

        /**
         * Function for adding period in the model. It takes @param  {} period
         */
        svc.addPeriod = function (periodName) {
            var deferred = $q.defer();
            svc
                .fetchAll().then(function (periods) {
                    var periodExists = _.some(periods, function (p) {
                        return p.name === periodName;
                    });
                    if (!periodExists) {
                        var period = {};
                        period.name = periodName;
                        UtilitiesService
                            .createListItem("periods", period)
                            .then(function (response) {
                                period.id = response.data.id;
                                periodsList.push(period);
                                deferred.resolve(periodsList);
                            })
                            .catch(function (error) {
                                deferred.reject(error);
                            });
                    } else {
                        svc.error.message = "Period is already registered!";
                        deferred.reject(svc.error);
                    }
                });
            return deferred.promise;
        };

        /**
         * Function for editing a period in the periods model. 
         * It takes parameter @param  {} period which is the new period.
         */
        svc.editPeriod = function (period) {
            var deferred = $q.defer();
            svc
                .fetchAll().then(function (periods) {
                    var periodExists = _.some(periods, function (p) {
                        return p.name === period.name;
                    });

                    if (!periodExists) {
                        UtilitiesService
                            .updateListItem("periods", period.id, period)
                            .then(function (response) {
                                _.forEach(periodsList, function (o) {
                                    if (o.id == period.id) {
                                        o.name = period.name;
                                    }
                                });
                                deferred.resolve(periodsList);
                            })
                            .catch(function (error) {
                                deferred.reject(error);
                            });
                    } else {
                        svc.error.message = "Provided Period is already registered!";
                        deferred.reject(svc.error);
                    }
                });
            return deferred.promise;
        };

        /**
         * Function for deleting a period from the period list.
         * It takes @param  {} period which is to be deleted
         */
        svc.removePeriod = function (period) {
            var deferred = $q.defer();
            svc
                .fetchAll()
                .then(function (periods) {
                    var periodExists = _.some(periods, function (p) {
                        return p.name === period.name;
                    });
                    if (periodExists) {

                        UtilitiesService
                            .deleteListItem("periods", period.id)
                            .then(function (response) {
                                _.remove(periodsList, function (o) {
                                    return o.id === period.id;
                                });
                                deferred.resolve(periodsList);
                            })
                            .catch(function (error) {
                                deferred.reject(error);
                            });
                    } else {
                        svc.error.message = "Period has already been deleted!";
                        deferred.reject(svc.error);
                    }
                })
                .catch(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };
    }
})();