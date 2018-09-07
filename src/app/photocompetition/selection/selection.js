(function () {
    'use strict';

    angular
        .module('selection', ['services.utilities', 'resources.selection'])
        .controller('SelectionController', SelectionController)

    SelectionController.$inject = ['UtilitiesService', 'growl', 'ImagesService',
        '$window', 'CompetitionsService', 'CategoriesService', 'PeriodsService',
        'ParametersService', '$dialogAlert', '$q'];

    function SelectionController(UtilitiesService, growl, ImagesService,
        $window, CompetitionsService, CategoriesService, PeriodsService, ParametersService,
        $dialogAlert, $q) {
        var ctrl = this;
        ctrl.menuItems = UtilitiesService.menuItems(2);
        ctrl.pageTitle = "BARAZA PHOTO COMPETITION - PHOTO SELECTION";

        var promises = [];
        promises.push(CategoriesService.fetchAll());
        promises.push(PeriodsService.fetchAll());
        promises.push(CompetitionsService.fetchAll());

        $q.all(promises)
            .then(function (promiseResults) {
                ctrl.categories = _.orderBy(promiseResults[0], ['name'], ['asc']);
                ctrl.category = ctrl.categories[0];
                ctrl.periods = _.orderBy(promiseResults[1], ['name'], ['desc']);
                ctrl.period = ctrl.periods[0];
                ctrl.allCompetitions = _.orderBy(promiseResults[2], ['name'], ['asc']);
                fillCompetitionNames();
                ImagesService
                    .getSelectionImages(ctrl.competition)
                    .then(function (selectionImages) {
                        ctrl.selectionImages = selectionImages;
                        _.forEach(ctrl.selectionImages, function (o) {
                            if (!o.selected) {
                                o.imageClass = "";
                            } else {
                                o.imageClass = "selectImage";
                            }
                        });
                        ctrl.selectedCount = _.filter(ctrl.selectionImages, function (o) {
                            if (o.selected == true) return o
                        }).length;
                        ctrl.selectionNotification = "Selected " + ctrl.selectedCount + " out of " + ctrl.maxSelectCount + " (Maximum Selection)";
                    })
                    .catch(function (error) {
                        console.log("Error: ", error.message);
                    });
            })
            .catch(function (error) {
                console.log("Error: ", error.message);
                growl.error(error.message, {
                    referenceId: 1
                });
            });

        ctrl.selectChanged = function () {
            fillCompetitionNames();
        };



        ParametersService
            .getParameterByValue('Photo selection count per category')
            .then(function (param) {
                ctrl.maxSelectCount = param.value;
            })
            .catch(function (error) {
                console.log("Error: ", error);
            });

        ctrl.imageSelected = function (image) {
            if (ctrl.selectedCount >= ctrl.maxSelectCount && !image.selected) {
                growl.error("Maximum set select count reached!",
                    {
                        referenceId: 2
                    }
                );
            } else {
                if (image.selected) {
                    image.imageClass = "";
                    image.selected = false;
                } else {
                    image.imageClass = "selectImage";
                    image.selected = true;
                }
                ctrl.selectedCount = _.filter(ctrl.selectionImages, function (o) {
                    if (o.selected == true) return o
                }).length;

                ctrl.selectionNotification = "Selected " + ctrl.selectedCount + " out of " + ctrl.maxSelectCount + " (Maximum Selection)";
            }
        };

        ctrl.submitSelection = function () {
            ImagesService
                .submitSelection(ctrl.selectionImages)
                .then(function (images) {
                    ctrl.selectionImages = images;
                    growl.success('Photo Selection Submitted Successfully!', {
                        referenceId: 1
                    });
                })
                .catch(function (error) {
                    console.log("Error: ", error);
                    growl.error("Photo Selection Failed! Kindly contact the system administrator.", {
                        referenceId: 1
                    });
                });
        };

        function fillCompetitionNames() {
            if (ctrl.category && ctrl.period && ctrl.allCompetitions.length > 0) {
                ctrl.competitions = _.filter(ctrl.allCompetitions, function (o) {
                    return o.category.id == ctrl.category.id && o.period.id == ctrl.period.id;
                });
                ctrl.competition = ctrl.competitions[0];
            }
        }

        ctrl.competitionChanged = function () {
            //ctrl.selectionImages.shift();
        };
    }
})();