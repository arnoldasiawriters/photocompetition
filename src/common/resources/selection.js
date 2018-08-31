(function () {
    'use strict';

    angular
        .module('resources.selection', [])
        .service('SelectionService', SelectionService);
    SelectionService.$inject = ['$q', '$http'];
    function SelectionService($q, $http) {
        var svc = this;
        svc.error = { message: "" };

        svc.getImages = function () {
            var response = $http({
                method: 'GET',
                url: 'common/data/images.json'
            });
            return response;
        };

        svc.getSelectionImages = function (competition, period, category) {
            var deferred = $q.defer();
            svc.getImages()
                .then(function (images) {
                    var selectionImages = _.filter(images.data.d, function (o) {
                        return o.competition == competition && o.period == period && o.category == category;
                    });
                    deferred.resolve(selectionImages);
                }).catch(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };

        svc.getFilteredImages = function (competition, period, category) {
            var deferred = $q.defer();
            return deferred.promise;
        };

        svc.getSelectedImages = function () {
            var deferred = $q.defer();
            var selected = _.filter(svc.images, function (o) {
                return o.selected == true;
            });
            if (selected.length > 0) {
                deferred.resolve(selected);
            } else {
                svc.error.message = "There are no selected images yet!";
                deferred.reject(svc.error);
            }
            return deferred.promise;
        };

        svc.submitSelection = function (images) {
            var deferred = $q.defer();
            svc.images = images;
            deferred.resolve(svc.images);
            return deferred.promise;
        };

        svc.submitVote = function (images) {
            var deferred = $q.defer();
            _.forEach(images, function (o) {
                _.find(svc.images, function (image) {
                    if (o.id == image.id) {
                        image.voteCount += 1;
                    }
                });
            });
            deferred.resolve(svc.images);
            return deferred.promise;
        };
    }
})();