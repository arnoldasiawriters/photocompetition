(function () {
    'use strict';

    angular
        .module('categories', ['resources.admin.categories', 'services.utilities'])
        .controller('CategoriesController', CategoriesController);

    CategoriesController.$inject = ['CategoriesService', 'UtilitiesService', 'growl',
        '$dialog', '$dialogConfirm', '$location', '$q', 'CompetitionsService'];

    function CategoriesController(CategoriesService, UtilitiesService, growl,
        $dialog, $dialogConfirm, $location, $q, CompetitionsService) {
        var initCategories = [];
        var ctrl = this;
        ctrl.menuItems = UtilitiesService.menuItems(5);
        ctrl.pageTitle = "BARAZA PHOTO COMPETITION - ADMINISTRATION (CATEGORIES)";
        ctrl.btnAddHref = "#addCategory";
        ctrl.category = {};

        var promises = [];
        promises.push(CategoriesService.fetchAll());
        promises.push(CompetitionsService.fetchAll());
        $q.all(promises)
            .then(function (promiseResults) {
                ctrl.categories = _.orderBy(promiseResults[0], ['competition.name', 'name'], ['asc', 'asc']);
                ctrl.competitions = _.orderBy(promiseResults[1], ['name'], ['asc']);
            })
            .catch(function (error) {
                console.log("Error: ", error.message);
                growl.error(error.message, {
                    referenceId: 1
                });
            });

        ctrl.addCategory = function () {
            var category = {};
            category.competitions = ctrl.competitions;
            var categoryDW = { scopeVariableName: 'category', dataObject: category };
            $dialog('app/photocompetition/categories/categories-add.tpl.html', 'md', categoryDW)
                .then(function (category) {
                    CategoriesService
                        .addCategory(category)
                        .then(function (categories) {
                            ctrl.categories = _.orderBy(categories, ['competition.name', 'name'], ['asc', 'asc']);
                            growl.success('Category saved successfully!', {
                                referenceId: 1
                            });
                        })
                        .catch(function (error) {
                            if (error) {
                                console.log(error);
                                growl.error(error.message, {
                                    referenceId: 1
                                });
                            }
                        });
                });
        };

        ctrl.editCategory = function (cat) {
            initCategories = angular.copy(ctrl.categories);
            var category = {};
            category.competitions = ctrl.competitions;
            category.competition = cat.competition;
            category.name = cat.name;
            category.id = cat.id;
            var categoryDW = { scopeVariableName: 'category', dataObject: category };

            $dialog('app/photocompetition/categories/categories-edit.tpl.html', 'md', categoryDW)
                .then(function (category) {
                    CategoriesService
                        .editCategory(category)
                        .then(function (categories) {
                            ctrl.categories = _.orderBy(categories, ['competition.name', 'name'], ['asc', 'asc']);
                            growl.success('Category updated successfully!', {
                                referenceId: 1
                            });
                        })
                        .catch(function (error) {
                            if (error) {
                                console.log(error);
                                ctrl.categories = initCategories;
                                growl.error(error.message, {
                                    referenceId: 1
                                });
                            }
                        });
                });
        };

        ctrl.deleteCategory = function (category) {
            if (category) {
                $dialogConfirm('Are you sure you want to delete this record (' + category.name + ' ) for competition ('+ category.competition.name +')?', 'Delete Category')
                    .then(function () {
                        CategoriesService
                            .removeCategory(category)
                            .then(function (categories) {
                                ctrl.categories = _.orderBy(categories, ['competition.name', 'name'], ['asc', 'asc']);
                                growl.success('Category deleted successfully!', {
                                    referenceId: 1
                                });
                            });
                    })
                    .catch(function (error) {
                        if (error) {
                            console.log(error);
                            growl.error(error.message, {
                                referenceId: 1
                            });
                        }
                    });
            }
        };
    }
})();