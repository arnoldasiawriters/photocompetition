(function () {
    'use strict';

    angular
        .module('categories', ['resources.admin.categories', 'services.utilities'])
        .controller('CategoriesController', CategoriesController);

    CategoriesController.$inject = ['CategoriesService', 'UtilitiesService', 'growl',
        '$dialog', '$dialogConfirm', '$location'];
    function CategoriesController(CategoriesService, UtilitiesService, growl,
        $dialog, $dialogConfirm, $location) {
        var ctrl = this;
        ctrl.menuItems = UtilitiesService.menuItems(5);
        ctrl.pageTitle = "BARAZA PHOTO COMPETITION - ADMINISTRATION (CATEGORIES)";
        ctrl.categories = CategoriesService.getCompetitionCats();
        ctrl.btnAddHref = "#addCategory";

        ctrl.addCategory = function () {
            $dialog('app/photocompetition/administration/categories/categories-add.tpl.html', 'md')
                .then(function (category) {
                    CategoriesService
                        .addCompetitionCats(category)
                        .then(function (categories) {
                            growl.success('Category saved successfully!', {
                                referenceId: 1,
                                onclose: function () {
                                    ctrl.categories = categories;
                                    $location.path("/listCategories");
                                }
                            });
                        })
                        .catch(function (error) {
                            growl.error(error.message, {
                                referenceId: 1,
                                onclose: function () {
                                    $location.path("/listCategories");
                                }
                            });
                        });
                });
        };

        ctrl.editCategory = function (categoryOld) {
            var categoryDW = { scopeVariableName: 'category', dataObject: categoryOld };
            $dialog('app/photocompetition/administration/categories/categories-edit.tpl.html', 'md', categoryDW)
                .then(function (categoryNew) {
                    CategoriesService
                        .editCompetitionCats(categoryOld, categoryNew)
                        .then(function (categories) {
                            growl.success('Category updated successfully!', {
                                referenceId: 1,
                                onclose: function () {
                                    ctrl.categories = categories;
                                    $location.path("/listCategories");
                                }
                            });
                        })
                        .catch(function (error) {
                            growl.error(error.message, {
                                referenceId: 1,
                                onclose: function () {
                                    $location.path("/listCategories");
                                }
                            });
                        });
                });
        };

        ctrl.deleteCategory = function (category) {
            if (category) {
                $dialogConfirm('Are you sure you want to delete this record (' + category + ' )', 'Delete Category')
                    .then(function () {
                        CategoriesService
                            .removeCompetitionCats(category)
                            .then(function (categories) {
                                growl.success('Category deleted successfully!', {
                                    referenceId: 1,
                                    onclose: function () {
                                        ctrl.categories = categories;
                                        $location.path("/listCategories");
                                    }
                                });
                            });
                    })
                    .catch(function (error) {
                        if (error) {
                            growl.error(error.message, {
                                referenceId: 1,
                                onclose: function () {
                                    $location.path("/listCategories");
                                }
                            });   
                        }
                    });
            }
        };

    }
})();