(function () {
    'use strict';

    angular
        .module('resources.admin.parameters', [])
        .service('ParametersService', ParametersService);

    function ParametersService() {
        var parameters = this;
        parameters.getParameters = function () {
            var parameters = [
                { title: "Photo upload count per user per category", value: "" },
                { title: "Photo selection count per category", value: "" },
                { title: "Photo user vote count per category", value: "" },
                { title: "Photo results count per category", value: "" }
            ];

            return parameters;
        };
    }
})();