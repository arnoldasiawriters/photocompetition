(function () {
    'use strict';

    angular
        .module('voting', ['services.utilities', 'resources.voting'])
        .controller('VotingController', VotingController);

    VotingController.$inject = ['UtilitiesService', 'growl', '$window',
        'CompetitionsService', 'CategoriesService', 'PeriodsService', 'SelectionService',
        'ParametersService', '$dialogAlert'];
    function VotingController(UtilitiesService, growl, $window, CompetitionsService,
        CategoriesService, PeriodsService, SelectionService, ParametersService,$dialogAlert) {
        var ctrl = this;
        ctrl.menuItems = UtilitiesService.menuItems(3);
        ctrl.pageTitle = "BARAZA PHOTO COMPETITION - PHOTO VOTING";
        ctrl.competitions = CompetitionsService.getCompetitions();
        ctrl.categories = CategoriesService.getCompetitionCats();
        ctrl.periods = PeriodsService.getPeriods();
        ctrl.selectedCount = 0;
        ctrl.maxSelectCount = 0;
        SelectionService
            .getSelectedImages()
            .then(function (images) {
                ctrl.images = images;
                console.log("ctrl.images: ", ctrl.images);
                
            })
            .catch(function (error) {
                growl
                    .warning(error.message, {
                        referenceId: 1
                    });
            });

        ParametersService
            .getParameterByValue('Photo user vote count per category')
            .then(function (param) {
                ctrl.maxSelectCount = param.value;
            })
            .catch(function (error) {
                console.log("Error: ", error);
            });

        ctrl.imageSelected = function (image) {
            if (ctrl.selectedCount >= ctrl.maxSelectCount && !image.votingSelected) {
                growl.error("You can only vote for "+ ctrl.maxSelectCount +" photo/s per category!",
                    {
                        referenceId: 2
                    }
                );
            } else {
                if (image.votingSelected) {
                    image.imageClass = "";
                    image.votingSelected = false;
                } else {
                    image.imageClass = "selectImage";
                    image.votingSelected = true;
                }
                ctrl.selectedCount = _.filter(ctrl.images, function (o) {
                    if (o.votingSelected == true) return o
                }).length;

                var selectionMsg = "Selected " + ctrl.selectedCount + " out of " + ctrl.maxSelectCount + " (Maximum Selection)";
                ctrl.selectionNotification = selectionMsg;
            }
        };

        ctrl.submit = function () {
            var votedImages = _.filter(ctrl.images, function (o) {
                return o.votingSelected == true;
            });

            SelectionService
                .submitVote(votedImages)
                .then(function (votedImages) {
                    $dialogAlert('You have submitted your vote Successfully!', 'Successfull Transaction')
                        .then(function () {
                            //$window.location.reload();
                        });
                })
                .catch(function (error) {
                    console.log("Error: ", error);
                    growl.error("Vote not submitted! Kindly contact the system administrator.", {
                        referenceId: 1
                    });
                });
        };
    }
})();