(function () {
    'use strict';

    angular
        .module('competitions', ['services.utilities', 'admindirectives', 'resources.admin.competitions'])
        .controller('CompetitionsController', CompetitionsController);

    CompetitionsController.$inject = ['UtilitiesService', 'growl', 'CompetitionsService',
        '$dialog', '$dialogConfirm', '$location'];
    function CompetitionsController(UtilitiesService, growl, CompetitionsService,
        $dialog, $dialogConfirm, $location) {
        var ctrl = this;
        ctrl.menuItems = UtilitiesService.menuItems(5);
        ctrl.pageTitle = "BARAZA PHOTO COMPETITION - ADMINISTRATION (COMPETITIONS)";
        ctrl.competitions = CompetitionsService.getCompetitions();
        ctrl.btnAddHref = "#addCompetition";

        ctrl.addCompetition = function () {
            $dialog('app/photocompetition/administration/competitions/competitions-add.tpl.html', 'md')
                .then(function (competition) {
                    CompetitionsService
                        .addCompetition(competition)
                        .then(function (competitions) {
                            growl.success('Competition saved successfully!', {
                                referenceId: 1,
                                onclose: function () {
                                    ctrl.competitions = competitions;
                                    $location.path("/listCompetitions");
                                }
                            });
                        })
                        .catch(function (error) {
                            growl.error(error.message, {
                                referenceId: 1,
                                onclose: function () {
                                    $location.path("/listCompetitions");
                                }
                            });
                        });
                });
        };

        ctrl.editCompetition = function (competitionOld) {
            var competitionDW = { scopeVariableName: 'competition', dataObject: competitionOld };
            $dialog('app/photocompetition/administration/competitions/competitions-edit.tpl.html', 'md', competitionDW)
                .then(function (competitionNew) {
                    CompetitionsService
                        .editCompetition(competitionOld, competitionNew)
                        .then(function (competitions) {
                            growl.success('Competition updated successfully!', {
                                referenceId: 1,
                                onclose: function () {
                                    ctrl.competitions = competitions;
                                    $location.path("/listCompetitions");
                                }
                            });
                        })
                        .catch(function (error) {
                            growl.error(error.message, {
                                referenceId: 1,
                                onclose: function () {
                                    $location.path("/listCompetitions");
                                }
                            });
                        });
                });
        };

        ctrl.deleteCompetition = function (competition) {
            if (competition) {
                $dialogConfirm('Are you sure you want to delete this record (' + competition + ' )', 'Delete Competition')
                    .then(function () {
                        CompetitionsService
                            .removeCompetition(competition)
                            .then(function (competitions) {
                                growl.success('Competition deleted successfully!', {
                                    referenceId: 1,
                                    onclose: function () {
                                        ctrl.competitions = competitions;
                                        $location.path("/listCompetitions");
                                    }
                                });
                            });
                    })
                    .catch(function (error) {
                        if (error) {
                            growl.error(error.message, {
                                referenceId: 1,
                                onclose: function () {
                                    $location.path("/listCompetitions");
                                }
                            });   
                        }
                    });
            }
        };
    }
})();