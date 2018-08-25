(function () {
    'use strict';

    angular
        .module('resources.admin.categories', [])
        .service('CategoriesService', CategoriesService);
    CategoriesService.$inject = ['$q'];
    function CategoriesService($q) {
        var ctrl = this;
        ctrl.error = {
            message: ""
        };
        ctrl.categories = ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"];
        ctrl.getCompetitionCats = function () {
            return ctrl.categories;
        };

        ctrl.editCompetitionCats = function (categoryOld, categoryNew) {
            var deferred = $q.defer();
            if (categoryOld == categoryNew) {
                ctrl.error.message = "You have not edited the category!";
                deferred.reject(ctrl.error);
            } else if (_.includes(ctrl.categories, categoryNew)) {
                ctrl.error.message = "Provided category is already registered!";
                deferred.reject(ctrl.error);
            } else if (categoryNew.trim().length <= 0) {
                ctrl.error.message = "Provided category is empty!";
                deferred.reject(ctrl.error);
            } else {
                for (var i = 0; i < ctrl.categories.length; i++) {
                    ctrl.categories[i] = ctrl.categories[i].replace(categoryOld, categoryNew);
                }
                deferred.resolve(ctrl.categories);
            }
            return deferred.promise;
        };

        ctrl.removeCompetitionCats = function (category) {
            var deferred = $q.defer();
            if (_.includes(ctrl.categories, category)) {
                _.pull(ctrl.categories, category);
                deferred.resolve(ctrl.categories);
            } else {
                ctrl.error.message = "Category not available!";
                deferred.reject(ctrl.error);
            }
            return deferred.promise;
        };

        ctrl.addCompetitionCats = function (category) {
            var deferred = $q.defer();
            if (_.includes(ctrl.categories, category)) {
                ctrl.error.message = "Category already registered!";
                deferred.reject(ctrl.error);
            } else if (category.trim().length <= 0) {
                ctrl.error.message = "Provided category is empty!";
                deferred.reject(ctrl.error);
            }  else {
                ctrl.categories.push(category);
                deferred.resolve(ctrl.categories);
            }
            return deferred.promise;
        };
    }
})();