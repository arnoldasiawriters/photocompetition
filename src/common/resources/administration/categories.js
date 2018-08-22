(function(){
    'use strict';

    angular
    .module('resources.admin.categories',[])
    .service('CategoriesService', CategoriesService);

    function CategoriesService() {
        var categories = this;
        categories.getCompetitionCats = function () {
            var competitioncats = ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"];
            return competitioncats;
        };
    }
})();