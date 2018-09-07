(function () {
    'use strict';
    /**
     * ImagesController provides view model for Images
     */
    angular
        .module('images', ['services.utilities', 'resources.images'])
        .controller('ImagesController', ImagesController);

    ImagesController.$inject = ['$scope', '$window', '$q', 'UtilitiesService',
        'growl', '$dialog', '$dialogAlert', 'CompetitionsService',
        'CategoriesService', 'PeriodsService', 'ImagesService'];

    function ImagesController($scope, $window, $q, UtilitiesService, growl,
        $dialog, $dialogAlert, CompetitionsService, CategoriesService,
        PeriodsService, ImagesService) {
        var ctrl = this;
        ctrl.menuItems = UtilitiesService.menuItems(1);
        ctrl.pageTitle = "BARAZA PHOTO COMPETITION - PHOTO UPLOAD";
        ctrl.photo = {};
        var promises = [];
        promises.push(CategoriesService.fetchAll());
        promises.push(PeriodsService.fetchAll());
        promises.push(CompetitionsService.fetchAll());

        $q.all(promises)
            .then(function (promiseResults) {
                ctrl.categories = _.orderBy(promiseResults[0], ['name'], ['asc']);
                ctrl.photo.category = ctrl.categories[0];
                ctrl.periods = _.orderBy(promiseResults[1], ['name'], ['desc']);
                ctrl.allCompetitions = _.orderBy(promiseResults[2], ['name'], ['asc']);
                ctrl.photo.period = ctrl.periods[0];
                fillCompetitionNames();
            })
            .catch(function (error) {
                console.log("Error: ", error.message);
                growl.error(error.message, {
                    referenceId: 1
                });
            });

        ctrl.selectChanged = function () {
            fillCompetitionNames();
        };

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

        ctrl.addImage = function () {
            ImagesService
                .addImage(ctrl.photo)
                .then(function (images) {
                    growl.success('Photo submitted successfully!', {
                        referenceId: 1
                    });
                    ctrl.photo.description = "";
                    ctrl.photo.thumbnail = "";
                    ctrl.photo.image = "";
                })
                .catch(function (error) {
                    growl.error(error.message, {
                        referenceId: 1
                    });
                });
        };

        function fillCompetitionNames() {
            if (ctrl.photo.category && ctrl.photo.period && ctrl.allCompetitions.length > 0) {
                ctrl.competitions = _.filter(ctrl.allCompetitions, function (o) {
                    return o.category.id == ctrl.photo.category.id && o.period.id == ctrl.photo.period.id;
                });
                ctrl.photo.competition = ctrl.competitions[0];
            }
        }
    }
})();