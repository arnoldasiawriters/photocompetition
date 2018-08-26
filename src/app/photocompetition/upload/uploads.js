(function () {
    'use strict';
    /**
     * UploadsController provides view model for Uploads
     */
    angular
        .module('uploads', ['services.utilities'])
        .controller('UploadsController', UploadsController);

    UploadsController.$inject = ['$scope', '$window', 'UtilitiesService', 'growl'];

    function UploadsController($scope, $window, UtilitiesService, growl) {
        var uploads = this;
        uploads.menuItems = UtilitiesService.menuItems(1);
        uploads.pageTitle = "BARAZA PHOTO COMPETITION - PHOTO UPLOAD";
        uploads.uploadedPhoto = function (event) {
            var imageFile = event.target.files[0];
            var reader = new FileReader();
            reader.onload = uploads.imageIsLoaded;
            reader.readAsDataURL(imageFile);
        };

        uploads.imageIsLoaded = function (e) {
            $scope.uploadedPhotoHref = e.target.result;
            $scope.$apply();
        };

        uploads.submit = function () {
            growl.success('Your photo has been submitted successfully!', {
                title: 'Successfull Transaction', onclose: function () {
                    $window.location.reload();
                },
                referenceId: 1
            });
        };
    }
})();