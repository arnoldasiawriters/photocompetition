(function () {
    'use strict';

    angular
        .module('parameters', ['resources.admin.parameters', 'services.utilities'])
        .controller('ParametersController', ParametersController);

        ParametersController.$inject = ['ParametersService','UtilitiesService', 'growl'];
    function ParametersController(ParametersService, UtilitiesService, growl) {
        var parameters = this;
        parameters.menuItems = UtilitiesService.menuItems(5);
        parameters.pageTitle = "BARAZA PHOTO COMPETITION - ADMINISTRATION (PARAMETERS)";
        parameters.parameters = ParametersService.getParameters();
        parameters.submit = function () {
            growl.success('Parameter values submitted successfully!', {
                title: 'Successfull Transaction', onclose: function () {
                    $window.location.reload();
                }
            });
        }; 
    }
})();