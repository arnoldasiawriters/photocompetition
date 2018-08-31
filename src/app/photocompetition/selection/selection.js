(function () {
    'use strict';

    angular
        .module('selection', ['services.utilities', 'resources.selection'])
        .controller('SelectionController', SelectionController)

    SelectionController.$inject = ['UtilitiesService', 'growl', 'SelectionService',
        '$window', 'CompetitionsService', 'CategoriesService', 'PeriodsService',
        'ParametersService', '$dialogAlert'];

    function SelectionController(UtilitiesService, growl, SelectionService,
        $window, CompetitionsService, CategoriesService, PeriodsService, ParametersService, $dialogAlert) {
        var ctrl = this;
        ctrl.menuItems = UtilitiesService.menuItems(2);
        ctrl.pageTitle = "BARAZA PHOTO COMPETITION - PHOTO SELECTION";
        ctrl.competitions = CompetitionsService.getCompetitions().sort();
        ctrl.categories = CategoriesService.getCompetitionCats().sort();
        ctrl.periods = PeriodsService.getPeriods().sort().reverse();
        ctrl.competition = ctrl.competitions[0];
        ctrl.period = ctrl.periods[0];
        ctrl.category = ctrl.categories[0];
        
        SelectionService
            .getSelectionImages(ctrl.competition, ctrl.period, ctrl.category)
            .then(function (selectionImages) {
                ctrl.images = selectionImages;
            })
            .catch(function (error) {
                console.log("Error: ", error.message);
            });

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
                ctrl.selectedCount = _.filter(ctrl.images, function (o) {
                    if (o.selected == true) return o
                }).length;

                var selectionMsg = "Selected " + ctrl.selectedCount + " out of " + ctrl.maxSelectCount + " (Maximum Selection)";
                ctrl.selectionNotification = selectionMsg;
            }
        };

        ctrl.submit = function () {
            console.log(ctrl);

            var images = ctrl.images;
            SelectionService
                .submitSelection(images)
                .then(function (images) {
                    $dialogAlert('Photo Selection Submitted Successfully!', 'Successfull Transaction')
                        .then(function () {
                            //$window.location.reload();
                        });
                })
                .catch(function (error) {
                    console.log("Error: ", error);
                    growl.error("Photo Selection Failed! Kindly contact the system administrator.", {
                        referenceId: 1
                    });
                });
        };
    }
})();