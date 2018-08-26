(function () {
    'use strict';

    angular
        .module('competitions', ['services.utilities', 'admindirectives', 'resources.admin.competitions'])
        .controller('CompetitionsController', CompetitionsController);

    CompetitionsController.$inject = ['UtilitiesService', 'growl', 'CompetitionsService',
        '$dialog', '$dialogConfirm'];
    function CompetitionsController(UtilitiesService, growl, CompetitionsService,
        $dialog, $dialogConfirm) {
        var ctrl = this;
        ctrl.menuItems = UtilitiesService.menuItems(5);
        ctrl.pageTitle = "BARAZA PHOTO COMPETITION - ADMINISTRATION (COMPETITIONS)";
        ctrl.competitions = CompetitionsService.getCompetitions().sort();
        ctrl.btnAddHref = "#addCompetition";

        ctrl.addCompetition = function () {
            $dialog('app/photocompetition/administration/competitions/competitions-add.tpl.html', 'md')
                .then(function (competition) {
                    CompetitionsService
                        .addCompetition(competition)
                        .then(function (competitions) {
                            ctrl.competitions = competitions.sort();
                            growl.success('Competition saved successfully!', {
                                referenceId: 1
                            });
                        })
                        .catch(function (error) {
                            if (error) {
                                growl.error(error.message, {
                                    referenceId: 1
                                });
                            }
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
                            ctrl.competitions = competitions.sort();
                            growl.success('Competition updated successfully!', {
                                referenceId: 1
                            });
                        })
                        .catch(function (error) {
                            if (error) {
                                growl.error(error.message, {
                                    referenceId: 1
                                });
                            }
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
                                ctrl.competitions = competitions.sort();
                                growl.success('Competition deleted successfully!', {
                                    referenceId: 1
                                });
                            });
                    })
                    .catch(function (error) {
                        if (error) {
                            growl.error(error.message, {
                                referenceId: 1
                            });
                        }
                    });
            }
        };
    }
})();