(function () {
    'use strict';

    angular
        .module('periods', ['resources.admin.periods', 'services.utilities'])
        .controller('PeriodsController', PeriodsController);

    PeriodsController.$inject = ['PeriodsService', 'UtilitiesService', 'growl',
        '$dialog', '$dialogConfirm'];
    function PeriodsController(PeriodsService, UtilitiesService, growl,
        $dialog, $dialogConfirm) {
        var ctrl = this;
        ctrl.menuItems = UtilitiesService.menuItems(5);
        ctrl.pageTitle = "BARAZA PHOTO COMPETITION - ADMINISTRATION (PERIODS)";
        ctrl.periods = PeriodsService.getPeriods().sort().reverse();
        
        ctrl.btnAddHref = "#addPeriod";

        ctrl.addPeriod = function () {            
            $dialog('app/photocompetition/administration/periods/periods-add.tpl.html', 'md')
                .then(function (period) {
                    PeriodsService
                        .addPeriod(period)
                        .then(function (periods) {
                            ctrl.periods = periods.sort().reverse();
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

        ctrl.editPeriod = function (periodOld) {
            var periodDW = { scopeVariableName: 'period', dataObject: periodOld };
            $dialog('app/photocompetition/administration/periods/periods-edit.tpl.html', 'md', periodDW)
                .then(function (periodNew) {
                    PeriodsService
                        .editPeriod(periodOld, periodNew)
                        .then(function (periods) {
                            ctrl.periods = periods.sort().reverse();
                            growl.success('Period updated successfully!', {
                                referenceId: 1
                            });
                        })
                        .catch(function (error) {
                            growl.error(error.message, {
                                referenceId: 1
                            });
                        });
                });
        };

        ctrl.deletePeriod = function (period) {
            if (period) {
                $dialogConfirm('Are you sure you want to delete this record (' + period + ' )', 'Delete Period')
                    .then(function () {
                        PeriodsService
                            .removePeriod(period)
                            .then(function (periods) {
                                ctrl.periods = periods.sort().reverse();
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