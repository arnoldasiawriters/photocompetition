(function () {
    'use strict';

    angular
        .module('selection', ['services.utilities', 'resources.images'])
        .controller('SelectionController', SelectionController)

    SelectionController.$inject = ['UtilitiesService', 'growl', 'ImagesService', 'CompetitionsService',
        'CategoriesService', 'ParametersService', '$q'];

    function SelectionController(UtilitiesService, growl, ImagesService, CompetitionsService,
        CategoriesService, ParametersService, $q) {

        var ctrl = this;
        ctrl.menuItems = UtilitiesService.menuItems(2);
        ctrl.pageTitle = "BARAZA PHOTO COMPETITION - PHOTO SELECTION";

        var promises = [];
        promises.push(CompetitionsService.fetchAll());
        promises.push(CategoriesService.fetchAll());

        $q.all(promises)
            .then(function (promiseResults) {
                ctrl.competitions = _.orderBy(promiseResults[0], ['name'], ['asc']);
                ctrl.competition = ctrl.competitions[0];
                ctrl.allCategories = promiseResults[1];
                ctrl.selectionImages = [];
                fillCategoryNames();
                fillImages();
            })
            .catch(function (error) {
                console.log("Error: ", error.message);
                growl.error(error.message, {
                    referenceId: 1
                });
            });

        ctrl.competitionChanged = function () {
            ctrl.selectionImages = [];
            fillCategoryNames();
            fillImages();
        };

        ctrl.categoryChanged = function () {
            fillImages();
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

        function fillCategoryNames() {
            if (ctrl.competition && ctrl.allCategories.length > 0) {
                ctrl.categories = _.filter(ctrl.allCategories, function (o) {
                    return o.competition.id == ctrl.competition.id;
                });
                ctrl.category = ctrl.categories[0];
            }
        }

        function fillImages() {
            if (ctrl.category) {
                ImagesService
                .getSelectionImages(ctrl.category)
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
            }
        };
    }
})();