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
        ctrl.currentUser = { "id": 1, "name": "Arnold Shangala Mwadwaa" }

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
            ctrl.votingImages = [];
            fillCategoryNames();
            fillImages();
        };

        ctrl.categoryChanged = function () {
            fillImages();
        };

        ParametersService
            .getParameterByValue('Photo user vote count per category')
            .then(function (param) {
                ctrl.maxVoteCount = param.value;
            })
            .catch(function (error) {
                console.log("Error: ", error);
            });

        ctrl.imageVoted = function (image) {
            if (!ctrl.voteSubmitted) {
                if (ctrl.voteCount >= ctrl.maxVoteCount && !image.imagevoted) {
                    growl.error("You can only vote for " + ctrl.maxVoteCount + " photo/s per category!",
                        {
                            referenceId: 2
                        }
                    );
                } else {
                    if (image.imagevoted) {
                        image.imageClass = "";
                        image.imagevoted = false;
                    } else {
                        image.imageClass = "selectImage";
                        image.imagevoted = true;
                    }
                    ctrl.voteCount = _.filter(ctrl.votingImages, function (o) {
                        if (o.imagevoted == true) return o
                    }).length;
                    var selectionMsg = "Selected " + ctrl.voteCount + " out of " + ctrl.maxVoteCount + " (Maximum Votes)";
                    ctrl.votingNotification = selectionMsg;
                }
            }
        };

        ctrl.submitVotes = function () {
            ImagesService
                .submitVotes(ctrl.votingImages, ctrl.currentUser, ctrl.category)
                .then(function (votingImages) {
                    ctrl.voteSubmitted = true;
                    ctrl.votingImages = votingImages;
                    ctrl.votingNotification = "Voted " + ctrl.voteCount + " out of " + ctrl.maxVoteCount + " (Maximum Votes) - You have already submitted your vote for the category!";
                    growl.success('Photo Votes Submitted Successfully!', {
                        referenceId: 1
                    });
                })
                .catch(function (error) {
                    console.log("Error: ", error);
                    growl.error(error.message, {
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
                    .getVotingImagesWithVoteData(ctrl.category, ctrl.currentUser)
                    .then(function (votingImages) {
                        ctrl.votingImages = votingImages;
                        _.forEach(ctrl.votingImages, function (o) {
                            if (!o.imagevoted) {
                                o.imageClass = "";
                            } else {
                                o.imageClass = "selectImage";
                                ctrl.voteSubmitted = true;
                            }
                        });
                        ctrl.voteCount = _.filter(ctrl.votingImages, function (o) {
                            if (o.imagevoted == true) return o
                        }).length;
                        if (ctrl.voteSubmitted) {
                            ctrl.votingNotification = "Voted " + ctrl.voteCount + " out of " + ctrl.maxVoteCount + " (Maximum Votes) - You have already submitted your vote for the category!";
                        } else {
                            ctrl.votingNotification = "Voted " + ctrl.voteCount + " out of " + ctrl.maxVoteCount + " (Maximum Votes)";   
                        }
                    })
                    .catch(function (error) {
                        console.log("Error: ", error.message);
                    });
            }
        };
    }
})();