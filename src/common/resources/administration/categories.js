(function () {
    'use strict';

    angular
        .module('resources.admin.categories', [])
        .service('CategoriesService', CategoriesService);
    CategoriesService.$inject = ['$q', 'UtilitiesService'];
    function CategoriesService($q, UtilitiesService) {
        var svc = this;
        var categoriesList = null;
        svc.error = { message: "" };

        /**
         * Function for fetching all categories in categories model
         */
        svc.fetchAll = function () {
            var deferred = $q.defer();
            categoriesList = [];
            UtilitiesService
                .getListItems("categories")
                .then(function (categories) {
                    categories = categories.data;
                    _.forEach(categories, function (v, k) {
                        var category = {};
                        category.id = v.id;
                        category.name = v.name;
                        categoriesList.push(category);
                    });
                    deferred.resolve(categoriesList);
                })
                .catch(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };

        /**
         * Function for adding category in the model. It that takes @param  {} category
         */
        svc.addCategory = function (categoryName) {
            var deferred = $q.defer();
            svc
                .fetchAll().then(function (categories) {
                    var categoryExists = _.some(categories, function (cat) {
                        return cat.name === categoryName;
                    });
                    if (!categoryExists) {
                        var category = {};
                        category.name = categoryName;
                        UtilitiesService
                            .createListItem("categories", category)
                            .then(function (response) {
                                category.id = response.data.id;
                                categoriesList.push(category);
                                deferred.resolve(categoriesList);
                            })
                            .catch(function (error) {
                                deferred.reject(error);
                            });
                    } else {
                        svc.error.message = "Category is already registered!";
                        deferred.reject(svc.error);
                    }
                });
            return deferred.promise;
        };

        /**
         * Function for editing a category in the categories model. 
         * It takes parameter @param  {} category which is the new category.
         */
        svc.editCategory = function (category) {
            var deferred = $q.defer();
            svc
                .fetchAll().then(function (categories) {
                    var categoryExists = _.some(categories, function (cat) {
                        return cat.name === category.name;
                    });

                    if (!categoryExists) {
                        UtilitiesService
                            .updateListItem("categories", category.id, category)
                            .then(function (response) {
                                _.forEach(categoriesList, function (o) {
                                    if (o.id == category.id) {
                                        o.name = category.name;
                                    }
                                });
                                deferred.resolve(categoriesList);
                            })
                            .catch(function (error) {
                                deferred.reject(error);
                            });
                    } else {
                        svc.error.message = "Provided Category is already registered!";
                        deferred.reject(svc.error);
                    }
                });
            return deferred.promise;
        };

        /**
         * Function for deleting a category from the category list.
         * It takes @param  {} category which is to be deleted
         */
        svc.removeCategory = function (category) {
            var deferred = $q.defer();
            svc
                .fetchAll()
                .then(function (categories) {
                    var categoryExists = _.some(categories, function (cat) {
                        return cat.name === category.name;
                    });
                    if (categoryExists) {

                        UtilitiesService
                            .deleteListItem("categories", category.id)
                            .then(function (response) {
                                _.remove(categoriesList, function (o) {
                                    return o.id === category.id;
                                });
                                deferred.resolve(categoriesList);
                            })
                            .catch(function (error) {
                                deferred.reject(error);
                            });
                    } else {
                        svc.error.message = "Category has already been deleted!";
                        deferred.reject(svc.error);
                    }
                })
                .catch(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };
    }
})();