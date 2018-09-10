(function () {
    'use strict';

    angular
        .module('competitions', ['services.utilities', 'admindirectives', 'resources.admin.competitions'])
        .controller('CompetitionsController', CompetitionsController);

    CompetitionsController.$inject = ['UtilitiesService', 'growl', 'CompetitionsService',
        '$q', '$dialog', '$dialogConfirm'];
    function CompetitionsController(UtilitiesService, growl, CompetitionsService,
        $q, $dialog, $dialogConfirm) {
        var initCompetitions = [];
        var ctrl = this;
        ctrl.menuItems = UtilitiesService.menuItems(5);
        ctrl.pageTitle = "BARAZA PHOTO COMPETITION - ADMINISTRATION (COMPETITIONS)";
        ctrl.btnAddHref = "#addCompetition";
        ctrl.competition = {};

        var promises = [];
        promises.push(CompetitionsService.fetchAll());
        $q.all(promises)
            .then(function (promiseResults) {
                ctrl.competitions = _.orderBy(promiseResults[0], ['name'], ['asc']);
            })
            .catch(function (error) {
                console.log("Error: ", error);
                growl.error(error.message, {
                    referenceId: 1
                });
            });

        ctrl.addCompetition = function () {
            $dialog('app/photocompetition/competitions/competitions-add.tpl.html', 'lg')
                .then(function (competition) {
                    CompetitionsService
                        .addCompetition(competition)
                        .then(function (competitions) {
                            ctrl.competitions = _.orderBy(competitions, ['name'], ['asc']);
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
 
        ctrl.editCompetition = function (competition) {
            initCompetitions = angular.copy(ctrl.competitions);
            var competitions = {};
            competitions.competition = competition;        
            var competitionDW = { scopeVariableName: 'competitions', dataObject: competitions };
            $dialog('app/photocompetition/competitions/competitions-edit.tpl.html', 'lg', competitionDW)
                .then(function (competition) {
                    CompetitionsService
                        .editCompetition(competition)
                        .then(function (competitions) {
                            ctrl.competitions = _.orderBy(competitions, ['name'], ['asc']);
                            growl.success('Competition updated successfully!', {
                                referenceId: 1
                            });
                        })
                        .catch(function (error) {
                            if (error) {
                                ctrl.competitions = initCompetitions;
                                growl.error(error.message, {
                                    referenceId: 1
                                });
                            }
                        });
                });
        };

        ctrl.deleteCompetition = function (competition) {
            if (competition) {
                $dialogConfirm('Are you sure you want to delete this record (' + competition.name + ' )', 'Delete Competition')
                    .then(function () {
                        CompetitionsService
                            .removeCompetition(competition)
                            .then(function (competitions) {
                                ctrl.competitions = _.orderBy(competitions, ['name'], ['asc']);
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