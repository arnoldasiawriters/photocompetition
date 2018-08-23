(function () {
    'use strict';

    angular
        .module('categories', ['resources.admin.categories', 'services.utilities'])
        .controller('CategoriesController', CategoriesController);

    CategoriesController.$inject = ['CategoriesService', 'UtilitiesService', 'growl',
        '$dialog', '$window', '$dialogConfirm', '$dialogAlert'];
    function CategoriesController(CategoriesService, UtilitiesService, growl, $dialog,
        $window, $dialogConfirm, $dialogAlert) {
        var categories = this;
        categories.menuItems = UtilitiesService.menuItems(5);
        categories.pageTitle = "BARAZA PHOTO COMPETITION - ADMINISTRATION (CATEGORIES)";
        categories.categories = CategoriesService.getCompetitionCats();
        categories.btnAddHref = "#addCategory";
        categories.addCategory = function () {
            categories.category = {};
            $dialog('app/photocompetition/administration/categories/categories-add.tpl.html', 'lg').then(function (category) {
                //console.log(category);
            });
        };

        categories.submit = function(category){
            console.log(category);
        };
    }
})();