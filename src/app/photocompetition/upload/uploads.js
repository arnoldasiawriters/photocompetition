(function () {
    'use strict';
    /**
     * UploadsController provides view model for Uploads
     */
    angular
        .module('uploads', ['services.utilities', 'resources.uploads'])
        .controller('UploadsController', UploadsController);

    UploadsController.$inject = ['$scope', '$window', 'UtilitiesService',
        'growl', '$dialog', '$dialogAlert', 'CompetitionsService',
        'CategoriesService', 'PeriodsService', 'UploadsService'];

    function UploadsController($scope, $window, UtilitiesService, growl,
        $dialog, $dialogAlert, CompetitionsService, CategoriesService,
        PeriodsService, UploadsService) {
        var ctrl = this;
        ctrl.menuItems = UtilitiesService.menuItems(1);

        var promises = [];
        promises.push(CategoriesService.fetchAll());
        promises.push(PeriodsService.fetchAll());

        $q.all(promises)
            .then(function(promiseResults){
                ctrl.categories = promiseResults[0];
                ctrl.periods = PeriodsService.getPeriods().sort().reverse();
            })
            .catch(function (error) {
                console.log("Error: ", error.message);
                growl.error(error.message, {
                    referenceId: 1
                });
            });

        ctrl.competitions = CompetitionsService.getCompetitions().sort();
        
        ctrl.pageTitle = "BARAZA PHOTO COMPETITION - PHOTO UPLOAD";
        ctrl.photo = {};
        ctrl.uploadedPhoto = function (event) {
            var imageFile = event.target.files[0];
            var reader = new FileReader();
            reader.onload = ctrl.imageIsLoaded;
            reader.readAsDataURL(imageFile);
        };

        ctrl.imageIsLoaded = function (e) {
            $scope.uploadedPhotoHref = e.target.result;
            $scope.$apply();
        };

        ctrl.submit = function () {
            UploadsService
                .submitPhoto(ctrl.photo)
                .then(function () {
                    $dialogAlert('Photo submitted successfully!', 'Successfull Transaction')
                        .then(function () {
                            $window.location.reload();
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