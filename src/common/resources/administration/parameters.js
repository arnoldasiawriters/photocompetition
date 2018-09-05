(function () {
    'use strict';

    angular
        .module('resources.admin.parameters', [])
        .service('ParametersService', ParametersService);

    ParametersService.$inject = ['$q', 'UtilitiesService'];
    function ParametersService($q, UtilitiesService) {
        var svc = this;
        var parametersList = null;
        svc.error = { message: "" };

        /**
         * Function for fetching all parameters in parameters model
         */
        svc.fetchAll = function () {
            var deferred = $q.defer();
            parametersList = [];
            UtilitiesService
                .getListItems("parameters")
                .then(function (parameters) {
                    parameters = parameters.data;
                    _.forEach(parameters, function (v, k) {
                        var parameter = {};
                        parameter.id = v.id;
                        parameter.title = v.title;
                        parameter.value = v.value;
                        parametersList.push(parameter);
                    });
                    deferred.resolve(parametersList);
                })
                .catch(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };

        /**
         * Function for editing a parameters in the parameters model. 
         * It takes parameter @param  {} parameters which is the new parameters.
         */
        svc.updateParameters = function (parameters) {
            var deferred = $q.defer();
            _.forEach(parameters, function (o) {
                UtilitiesService
                    .updateListItem("parameters", o.id, o)
                    .then(function (response) {
                        _.forEach(parametersList, function (o) {
                            if (o.id == parameters.id) {
                                o = response.data;
                            }
                        });
                    })
                    .catch(function (error) {
                        deferred.reject(error);
                    });
                deferred.resolve(parametersList);
            });
            return deferred.promise;
        };

        svc.getParameterByValue = function (param) {
            var deferred = $q.defer();
            svc
                .fetchAll()
                .then(function (parameters) {
                    var paramObj = {};
                    var paramObj = _.find(parameters, function (o) {
                        return o.title == param;
                    });

                    if (paramObj) {
                        deferred.resolve(paramObj);
                    } else {
                        svc.error.message = "Parameter is not available";
                        deferred.reject(svc.error);
                    }
                })
                .catch(function error(error) {
                    deferred.reject(reject);
                });
            return deferred.promise;
        };
    }
})();