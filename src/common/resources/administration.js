(function () {
    'use strict';

    angular
        .module('resources.administration', [])
        .service('AdministrationService', AdministrationService);
AdministrationService.$inject = ['CategoriesService'];
    function AdministrationService(CategoriesService) {
        var admin = this;
    }
})();