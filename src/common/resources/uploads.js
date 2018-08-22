(function () {
    'use strict';

    angular
        .module('resources.uploads', [])
        .service('UploadsService', UploadsService);

    function UploadsService() {
        var uploads = this;
    }
})();