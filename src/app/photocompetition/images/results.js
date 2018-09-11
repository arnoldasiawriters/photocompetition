(function () {
    'use strict';

    angular
        .module('results', ['services.utilities', 'resources.admin.competitions'])
        .controller('ResultsController', ResultsController);

    ResultsController.$inject = ['UtilitiesService', 'growl', 'CompetitionsService', 'CategoriesService',
        'ImagesService', '$q'];
    function ResultsController(UtilitiesService, growl, CompetitionsService, CategoriesService,
        ImagesService, $q) {
        var ctrl = this;
        ctrl.menuItems = UtilitiesService.menuItems(4);
        ctrl.pageTitle = "BARAZA PHOTO COMPETITION - RESULTS";
        ctrl.active = "";

        var promises = [];
        promises.push(CompetitionsService.fetchAll())
        $q.all(promises)
            .then(function (promiseResults) {
                ctrl.competitions = promiseResults[0];
                ctrl.competition = ctrl.competitions[0];
                fillCategories();
            })
            .catch(function (error) {
                console.log("Error: ", error);
                growl.error(error.message, {
                    referenceId: 1
                });
            });

        ctrl.competitionChanged = function () {
            fillCategories();
        };

        function fillCategories() {
            if (ctrl.competition) {
                CategoriesService
                    .getCategoriesByCompetition(ctrl.competition)
                    .then(function (cats) {
                        ctrl.categories = cats;
                        ctrl.loadCategoryResults(ctrl.categories[0]);
                    })
                    .catch(function (error) {
                        console.log("Error: ", error);
                        growl.error(error.message, {
                            referenceId: 1
                        });
                    });
            }
        }

        ctrl.loadCategoryResults = function (category) {
            ctrl.images = [];
            clearButtonClass(ctrl.categories)
            category.active = "active";
            if (category) {
                ImagesService.getImagesByCategory(category)
                .then(function (images) {
                    ctrl.images = images;
                })
                .catch(function (error) {
                    console.log(error);
                    growl.error(error.message, {
                        referenceId: 1
                    });
                });
            }
        };

        function clearButtonClass(categories) {
            _.forEach(categories, function (o) {
                o.active = "";
            });
        }
    }
})();