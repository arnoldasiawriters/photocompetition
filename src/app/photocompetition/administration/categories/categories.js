(function () {
    'use strict';

    angular
        .module('categories', ['resources.admin.categories', 'services.utilities'])
        .controller('CategoriesController', CategoriesController);

    CategoriesController.$inject = ['CategoriesService', 'UtilitiesService', 'growl',
        '$dialog', '$dialogConfirm'];
    function CategoriesController(CategoriesService, UtilitiesService, growl,
        $dialog, $dialogConfirm) {
        var ctrl = this;
        ctrl.menuItems = UtilitiesService.menuItems(5);
        ctrl.pageTitle = "BARAZA PHOTO COMPETITION - ADMINISTRATION (CATEGORIES)";
        ctrl.categories = CategoriesService.getCompetitionCats().sort();
        ctrl.btnAddHref = "#addCategory";

        ctrl.addCategory = function () {
            $dialog('app/photocompetition/administration/categories/categories-add.tpl.html', 'md')
                .then(function (category) {
                    CategoriesService
                        .addCompetitionCats(category)
                        .then(function (categories) {
                            ctrl.categories = categories.sort();
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

        ctrl.editCategory = function (categoryOld) {
            var categoryDW = { scopeVariableName: 'category', dataObject: categoryOld };
            $dialog('app/photocompetition/administration/categories/categories-edit.tpl.html', 'md', categoryDW)
                .then(function (categoryNew) {
                    CategoriesService
                        .editCompetitionCats(categoryOld, categoryNew)
                        .then(function (categories) {
                            ctrl.categories = categories.sort();
                            growl.success('Category updated successfully!', {
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

        ctrl.deleteCategory = function (category) {
            if (category) {
                $dialogConfirm('Are you sure you want to delete this record (' + category + ' )', 'Delete Category')
                    .then(function () {
                        CategoriesService
                            .removeCompetitionCats(category)
                            .then(function (categories) {
                                ctrl.categories = categories.sort();
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