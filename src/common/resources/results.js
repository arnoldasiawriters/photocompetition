(function () {
    'use strict';

    angular
        .module('resources.results', [])
        .service('ResultsService', ResultsService);

    function ResultsService() {
        var results = this;
    }
})();