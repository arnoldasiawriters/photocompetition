(function () {
    'use strict';

    angular
        .module('resources.admin.categories', [])
        .service('CategoriesService', CategoriesService);
    CategoriesService.$inject = ['$q'];
    function CategoriesService($q) {
        var ctrl = this;
        ctrl.categories = ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"];
        ctrl.getCompetitionCats = function () {
            return ctrl.categories;
        };

        ctrl.editCompetitionCats = function (category) {
            var deferred = $q.defer();
            if (_.includes(ctrl.categories, category)) {
                _.pull(ctrl.categories, category);
                deferred.resolve(ctrl.categories);
            } else {
                deferred.reject("Category not available");
            }
            return deferred.promise;
        };

        ctrl.removeCompetitionCats = function (category) {
            var deferred = $q.defer();
            if (_.includes(ctrl.categories, category)) {
                _.pull(ctrl.categories, category);
                deferred.resolve(ctrl.categories);
            } else {
                deferred.reject("Category not available");
            }
            return deferred.promise;
        };

        ctrl.addCompetitionCats = function (category) {
            var deferred = $q.defer();
            if (category) {
                ctrl.categories.add(category);
                deferred.resolve(ctrl.categories);
            } else {
                deferred.reject("Provided category is not ok.");
            }
            return deferred.promise;
        };
    }
})();