(function () {
    'use strict';

    angular
        .module('categories', ['resources.admin.categories', 'services.utilities'])
        .controller('CategoriesController', CategoriesController);

    CategoriesController.$inject = ['CategoriesService', 'UtilitiesService', 'growl',
        '$dialog', '$dialogConfirm', '$location'];

    function CategoriesController(CategoriesService, UtilitiesService, growl,
        $dialog, $dialogConfirm, $location) {
        var initCategories = [];
        var ctrl = this;
        ctrl.menuItems = UtilitiesService.menuItems(5);
        ctrl.pageTitle = "BARAZA PHOTO COMPETITION - ADMINISTRATION (CATEGORIES)";
        ctrl.btnAddHref = "#addCategory";

        CategoriesService
            .fetchAll()
            .then(function (categories) {
                ctrl.categories = _.sortBy(categories, [function (o) { return o.name; }]);
            })
            .catch(function (error) {
                console.log("Error: ", error.message);
            });

        ctrl.addCategory = function () {
            $dialog('app/photocompetition/administration/categories/categories-add.tpl.html', 'md')
                .then(function (category) {
                    CategoriesService
                        .addCategory(category)
                        .then(function (categories) {
                            ctrl.categories = _.sortBy(categories, [function (o) { return o.name; }]);
                            growl.success('Category saved successfully!', {
                                referenceId: 1
                            });
                        })
                        .catch(function (error) {
                            if (error) {
                                growl.error(error.message, {
                                    referenceId: 1
                                });
                            }
                        });
                });
        };

        ctrl.editCategory = function (category) {
            initCategories = angular.copy(ctrl.categories);
            var categoryDW = { scopeVariableName: "category", dataObject: category };
            $dialog('app/photocompetition/administration/categories/categories-edit.tpl.html', 'md', categoryDW)
                .then(function (category) {
                    CategoriesService
                        .editCategory(category)
                        .then(function (categories) {
                            ctrl.categories = _.sortBy(categories, [function (o) { return o.name; }]);
                            growl.success('Category updated successfully!', {
                                referenceId: 1
                            });
                        })
                        .catch(function (error) {
                            if (error) {
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
                $dialogConfirm('Are you sure you want to delete this record (' + category.name + ' )', 'Delete Category')
                    .then(function () {
                        CategoriesService
                            .removeCategory(category)
                            .then(function (categories) {
                                ctrl.categories = _.sortBy(categories, [function (o) { return o.name; }]);
                                growl.success('Category deleted successfully!', {
                                    referenceId: 1
                                });
                            });
                    })
                    .catch(function (error) {
                        if (error) {
                            growl.error(error.message, {
                                referenceId: 1
                            });
                        }
                    });
            }
        };
    }
})();