(function () {
    'use strict';
    /**
     * UploadsController provides view model for Uploads
     */
    angular.module('uploads',['services.utilities'])
    .controller('UploadsController',UploadsController);

    UploadsController.$inject = ['UtilitiesService'];

    function UploadsController(UtilitiesService) {
        var uploads = this;
        uploads.menuItems = UtilitiesService.menuItems(1);
        uploads.pageTitle = "BARAZA PHOTO COMPETITION - PHOTO UPLOAD";
    }
})();