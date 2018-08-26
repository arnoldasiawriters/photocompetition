(function () {
    'use strict';

    angular
        .module('resources.uploads', [])
        .service('UploadsService', UploadsService);

    UploadsService.$inject = ['$q'];
    function UploadsService($q) {
        var svc = this;
        svc.error = { message: "" };
        svc.submitPhoto = function (photoDetails) {
            var deferred = $q.defer();
            if (photoDetails) {
                deferred.resolve("Submitted Successfull");
            } else {
                svc.error.message = "Photo has not been provided.";
                deferred.reject(svc.error.message);
            }
            return deferred.promise;
        };
    }
})();