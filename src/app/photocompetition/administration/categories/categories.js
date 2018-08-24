(function () {
    'use strict';

    angular
        .module('categories', ['resources.admin.categories', 'services.utilities'])
        .controller('CategoriesController', CategoriesController);

    CategoriesController.$inject = ['CategoriesService', 'UtilitiesService', 'growl',
        '$dialog', '$window', '$dialogConfirm', '$dialogAlert', '$location', '$routeParams'];
    function CategoriesController(CategoriesService, UtilitiesService, growl, $dialog,
        $window, $dialogConfirm, $dialogAlert, $location, $routeParams) {
        var ctrl = this;

        ctrl.remove = function (category) {
            CategoriesService
                .removeCompetitionCats(category)
                .then(function (data) {
                    ctrl.categories = data;
                });
        };

        ctrl.menuItems = UtilitiesService.menuItems(5);
        ctrl.pageTitle = "BARAZA PHOTO COMPETITION - ADMINISTRATION (CATEGORIES)";
        ctrl.categories = CategoriesService.getCompetitionCats();
        ctrl.btnAddHref = "#addCategory";

        ctrl.addCategory = function () {
            ctrl.categoryName = "";
            $dialog('app/photocompetition/administration/categories/categories-add.tpl.html', 'md')
                .then(function (category) {
                    CategoriesService
                        .addCompetitionCats(category)
                        .then(function (categories) {
                            growl.success('Your category has been submitted successfully!', {
                                title: 'Success Transaction', onclose: function () {
                                    ctrl.categories = categories;
                                    $location.path("/listCategories");
                                }
                            });
                        });
                });
        };

        ctrl.editCategory = function (category) {
            var categoryDW = { scopeVariableName: 'category', dataObject: category };
            $dialog('app/photocompetition/administration/categories/categories-edit.tpl.html', 'md', categoryDW)
                .then(function (category) {
                    growl.success('Your category has been updated successfully!', {
                        title: 'Success Transaction', onclose: function () {
                            $window.location.reload();
                        }
                    });
                    $location.path("/listCategories");
                });
        };

        ctrl.deleteCategory = function (category) {
            if (category) {
                $dialogConfirm('Are you sure you want to delete this record (' + category + ' )', 'Delete Category')
                    .then(function () {
                        ctrl.remove(category);
                    });
            }
        };

    }
})();