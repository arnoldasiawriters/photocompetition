(function () {
    'use strict';

    angular
        .module('resources.admin.categories', [])
        .service('CategoriesService', CategoriesService);
    CategoriesService.$inject = ['$q'];
    function CategoriesService($q) {
        var svc = this;
        svc.error = { message: "" };
        svc.categories = ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"];
        
        svc.getCompetitionCats = function () {
            return svc.categories;
        };

        svc.addCompetitionCats = function (category) {
            var deferred = $q.defer();
            if (_.includes(svc.categories, category)) {
                svc.error.message = "Category already registered!";
                deferred.reject(svc.error);
            } else if (category.trim().length <= 0) {
                svc.error.message = "Provided category is empty!";
                deferred.reject(svc.error);
            }  else {
                svc.categories.push(category);
                deferred.resolve(svc.categories);
            }
            return deferred.promise;
        };
        svc.editCompetitionCats = function (categoryOld, categoryNew) {
            var deferred = $q.defer();
            if (categoryOld == categoryNew) {
                svc.error.message = "You have not edited the category!";
                deferred.reject(svc.error);
            } else if (_.includes(svc.categories, categoryNew)) {
                svc.error.message = "Provided category is already registered!";
                deferred.reject(svc.error);
            } else if (categoryNew.trim().length <= 0) {
                svc.error.message = "Provided category is empty!";
                deferred.reject(svc.error);
            } else {
                for (var i = 0; i < svc.categories.length; i++) {
                    svc.categories[i] = svc.categories[i].replace(categoryOld, categoryNew);
                }
                deferred.resolve(svc.categories);
            }
            return deferred.promise;
        };

        svc.removeCompetitionCats = function (category) {
            var deferred = $q.defer();
            if (_.includes(svc.categories, category)) {
                _.pull(svc.categories, category);
                deferred.resolve(svc.categories);
            } else {
                svc.error.message = "Category not available!";
                deferred.reject(svc.error);
            }
            return deferred.promise;
        };
    }
})();