(function () {
    'use strict';

    angular
        .module('resources.admin.parameters', [])
        .service('ParametersService', ParametersService);

    ParametersService.$inject = ['$q'];
    function ParametersService($q) {
        var svc = this;
        svc.error = { message: "" };
        svc.parameters = [
            { id: 1, title: "Photo upload count per user per category", value: 1 },
            { id: 2, title: "Photo selection count per category", value: 5 },
            { id: 3, title: "Photo user vote count per category", value: 1 },
            { id: 4, title: "Photo results count per category", value: 3 }
        ];
        svc.getParameters = function () {
            return svc.parameters;
        };

        svc.updateParameters = function (parameters) {
            var deferred = $q.defer();
            svc.parameters = parameters;
            deferred.resolve(svc.parameters);
            return deferred.promise;
        };

        svc.getParameterByValue = function (param) {
            var deferred = $q.defer();
            var parameters = svc.getParameters();
            var paramObj = {};            
            var paramObj = _.find(svc.parameters, function (o) {
                return o.title == param;
            });

            if (paramObj) {
                deferred.resolve(paramObj);
            } else {
                svc.error.message = "Parameter is not available";
                deferred.reject(svc.error);
            }
            return deferred.promise;
        };
    }
})();