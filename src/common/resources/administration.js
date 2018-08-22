(function () {
    'use strict';

    angular
        .module('resources.administration', [])
        .service('AdministrationService', AdministrationService);

    function AdministrationService() {
        var administration = this;
    }
})();