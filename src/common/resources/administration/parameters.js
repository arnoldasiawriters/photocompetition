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
            { title: "Photo upload count per user per category", value: 1 },
            { title: "Photo selection count per category", value: 2 },
            { title: "Photo user vote count per category", value: 3 },
            { title: "Photo results count per category", value: 4 }
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
    }
})();