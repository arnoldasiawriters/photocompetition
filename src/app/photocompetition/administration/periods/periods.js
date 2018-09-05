(function () {
    'use strict';

    angular
        .module('periods', ['resources.admin.periods', 'services.utilities'])
        .controller('PeriodsController', PeriodsController);

    PeriodsController.$inject = ['PeriodsService', 'UtilitiesService', 'growl',
        '$dialog', '$dialogConfirm'];
    function PeriodsController(PeriodsService, UtilitiesService, growl,
        $dialog, $dialogConfirm) {
        var initPeriods = [];
        var ctrl = this;
        ctrl.menuItems = UtilitiesService.menuItems(5);
        ctrl.pageTitle = "BARAZA PHOTO COMPETITION - ADMINISTRATION (PERIODS)";
        ctrl.btnAddHref = "#addPeriod";

        PeriodsService
            .fetchAll()
            .then(function (periods) {
                ctrl.periods = _.orderBy(periods, ['name'], ['desc']);
            })
            .catch(function (error) {
                console.log("Error: ", error.message);
            });

        ctrl.addPeriod = function () {
            $dialog('app/photocompetition/administration/periods/periods-add.tpl.html', 'md')
                .then(function (period) {
                    PeriodsService
                        .addPeriod(period)
                        .then(function (periods) {
                            ctrl.periods = _.orderBy(periods, ['name'], ['desc']);
                            growl.success('Period saved successfully!', {
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

        ctrl.editPeriod = function (period) {
            initPeriods = angular.copy(ctrl.periods);
            var periodDW = { scopeVariableName: "period", dataObject: period };
            $dialog('app/photocompetition/administration/periods/periods-edit.tpl.html', 'md', periodDW)
                .then(function (period) {
                    PeriodsService
                        .editPeriod(period)
                        .then(function (periods) {
                            ctrl.periods = _.orderBy(periods, ['name'], ['desc']);
                            growl.success('Period updated successfully!', {
                                referenceId: 1
                            });
                        })
                        .catch(function (error) {
                            if (error) {
                                ctrl.periods = initPeriods;
                                growl.error(error.message, {
                                    referenceId: 1
                                });
                            }
                        });
                });
        };

        ctrl.deletePeriod = function (period) {
            if (period) {
                $dialogConfirm('Are you sure you want to delete this record (' + period.name + ' )', 'Delete Category')
                    .then(function () {
                        PeriodsService
                            .removePeriod(period)
                            .then(function (periods) {
                                ctrl.periods = _.orderBy(periods, ['name'], ['desc']);
                                growl.success('Period deleted successfully!', {
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