(function () {
    'use strict';

    angular
        .module('voting', ['services.utilities', 'resources.images'])
        .controller('VotingController', VotingController);

    VotingController.$inject = ['UtilitiesService', 'growl', 'CompetitionsService', 'CategoriesService',
        'ImagesService', 'ParametersService', '$dialogAlert', '$q'];
    function VotingController(UtilitiesService, growl, CompetitionsService, CategoriesService,
        ImagesService, ParametersService, $dialogAlert, $q) {
        var ctrl = this;
        ctrl.menuItems = UtilitiesService.menuItems(3);
        ctrl.pageTitle = "BARAZA PHOTO COMPETITION - PHOTO VOTING";
        ctrl.voteCount = 0;
        ctrl.maxVoteCount = 0;

        var promises = [];
        promises.push(CompetitionsService.fetchAll());
        promises.push(CategoriesService.fetchAll());

        $q.all(promises)
            .then(function (promiseResults) {
                ctrl.competitions = _.orderBy(promiseResults[0], ['name'], ['asc']);
                ctrl.competition = ctrl.competitions[0];
                ctrl.allCategories = promiseResults[1];
                ctrl.votingImages = [];
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
            .getParameterByValue('Photo user vote count per category')
            .then(function (param) {
                ctrl.maxSelectCount = param.value;
            })
            .catch(function (error) {
                console.log("Error: ", error);
            });

        // ctrl.imageSelected = function (image) {
        //     if (ctrl.selectedCount >= ctrl.maxSelectCount && !image.votingSelected) {
        //         growl.error("You can only vote for " + ctrl.maxSelectCount + " photo/s per category!",
        //             {
        //                 referenceId: 2
        //             }
        //         );
        //     } else {
        //         if (image.votingSelected) {
        //             image.imageClass = "";
        //             image.votingSelected = false;
        //         } else {
        //             image.imageClass = "selectImage";
        //             image.votingSelected = true;
        //         }
        //         ctrl.selectedCount = _.filter(ctrl.images, function (o) {
        //             if (o.votingSelected == true) return o
        //         }).length;

        //         var selectionMsg = "Selected " + ctrl.selectedCount + " out of " + ctrl.maxSelectCount + " (Maximum Selection)";
        //         ctrl.selectionNotification = selectionMsg;
        //     }
        // };

        // ctrl.submit = function () {
        //     var votedImages = _.filter(ctrl.images, function (o) {
        //         return o.votingSelected == true;
        //     });

        //     SelectionService
        //         .submitVote(votedImages)
        //         .then(function (votedImages) {
        //             $dialogAlert('You have submitted your vote Successfully!', 'Successfull Transaction')
        //                 .then(function () {
        //                     //$window.location.reload();
        //                 });
        //         })
        //         .catch(function (error) {
        //             console.log("Error: ", error);
        //             growl.error("Vote not submitted! Kindly contact the system administrator.", {
        //                 referenceId: 1
        //             });
        //         });
        // };

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
                    .getVotingImages(ctrl.category)
                    .then(function (votingImages) {
                        ctrl.votingImages = votingImages;
                        _.forEach(ctrl.votingImages, function (o) {
                            if (!o.selected) {
                                o.imageClass = "";
                            } else {
                                o.imageClass = "selectImage";
                            }
                        });
                        ctrl.selectedCount = _.filter(ctrl.votingImages, function (o) {
                            if (o.selected == true) return o
                        }).length;
                        ctrl.votingNotification = "Voted " + ctrl.selectedCount + " out of " + ctrl.maxSelectCount + " (Maximum Selection)";
                    })
                    .catch(function (error) {
                        console.log("Error: ", error.message);
                    });
            }
        };
    }
})();