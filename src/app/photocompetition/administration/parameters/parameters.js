(function () {
    'use strict';

    angular
        .module('parameters', ['resources.admin.parameters', 'services.utilities'])
        .controller('ParametersController', ParametersController);

        ParametersController.$inject = ['ParametersService','UtilitiesService', 'growl'];
    function ParametersController(ParametersService, UtilitiesService, growl) {
        var ctrl = this;
        ctrl.menuItems = UtilitiesService.menuItems(5);
        ctrl.pageTitle = "BARAZA PHOTO COMPETITION - ADMINISTRATION (PARAMETERS)";
        ctrl.parameters = ParametersService.getParameters();
        console.log( ctrl.parameters);
        
        ctrl.update = function () {
            ParametersService
            .updateParameters(ctrl.parameters)
            .then(function (parameters) {
                ctrl.parameters = parameters;
                growl.success('Parameter values updated successfully!', {
                    referenceId: 1
                });
            })
            .catch(function (error) {
                growl.error(error.message, {
                    referenceId: 1
                });
            });
        }; 
    }
})();