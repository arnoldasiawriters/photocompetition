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
                .getListItems("photocategories")
                .then(function (categories) {
                    categories = categories.data;
                    _.forEach(categories, function (v, k) {
                        var category = {};
                        category.id = v.id;
                        category.name = v.name;
                        category.competition = { "id": v.competition.id, "name": v.competition.name };
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
         * Function for adding category in the model. It takes @param  {} category
         */
        svc.addCategory = function (cat) {
            var deferred = $q.defer();
            svc
                .fetchAll().then(function (categories) {
                    var categoryExists = _.some(categories, function (o) {
                        return o.name === cat.name && o.competition.name === cat.competition.name;
                    });

                    if (!categoryExists) {
                        var category = {};
                        category.name = cat.name;
                        category.competition = { "id": cat.competition.id, "name": cat.competition.name };

                        UtilitiesService
                            .createListItem("photocategories", category)
                            .then(function (response) {
                                cat.id = response.data.id;
                                categoriesList.push(cat);
                                deferred.resolve(categoriesList);
                            })
                            .catch(function (error) {
                                deferred.reject(error);
                            });
                    } else {
                        svc.error.message = "Provided Category for competition " + cat.competition.name + " is already registered!";
                        deferred.reject(svc.error);
                    }
                });
            return deferred.promise;
        };

        /**
         * Function for editing a category in the categories model. 
         * It takes parameter @param  {} category which is the new category.
         */
        svc.editCategory = function (cat) {
            var deferred = $q.defer();
            svc
                .fetchAll().then(function (categories) {
                    var categoryExists = _.some(categories, function (o) {
                        return o.name === cat.name && o.competition.name === cat.competition.name;
                    });

                    if (!categoryExists) {
                        UtilitiesService
                            .updateListItem("photocategories", cat.id, cat)
                            .then(function (response) {
                                _.forEach(categoriesList, function (o) {
                                    if (o.id == cat.id) {
                                        o.competition = cat.competition;
                                    }
                                });
                                deferred.resolve(categoriesList);
                            })
                            .catch(function (error) {
                                deferred.reject(error);
                            });
                    } else {
                        svc.error.message = "Provided Category for competition " + cat.competition.name + " is already registered!";
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
                    var categoryExists = _.some(categories, function (o) {
                        return o.name === category.name && o.competition.name === category.competition.name;
                    });
                    if (categoryExists) {
                        UtilitiesService
                            .deleteListItem("photocategories", category.id)
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

        /**
         * Function that gets categories of a given competition
         * @param  {} competition
         */
        svc.getCategoriesByCompetition = function (competition) {
            var deferred = $q.defer();
            if(competition.id){
                svc.fetchAll()
                .then(function (categories) {
                    var cats = _.filter(categories, function (o) {
                        return o.competition.id == competition.id;
                    });
                    deferred.resolve(cats);
                })
                .catch(function (error) {
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        };
    }
})();