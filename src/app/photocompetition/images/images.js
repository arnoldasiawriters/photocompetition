(function () {
    'use strict';
    /**
     * ImagesController provides view model for Images
     */
    angular
        .module('images', ['services.utilities', 'resources.images'])
        .controller('ImagesController', ImagesController);

    ImagesController.$inject = ['$scope', '$q', 'UtilitiesService', 'growl', 'CompetitionsService',
        'CategoriesService', 'ImagesService'];

    function ImagesController($scope, $q, UtilitiesService, growl, CompetitionsService,
        CategoriesService, ImagesService) {

        var ctrl = this;
        ctrl.menuItems = UtilitiesService.menuItems(1);
        ctrl.pageTitle = "BARAZA PHOTO COMPETITION - PHOTO UPLOAD";
        ctrl.photo = {};
        var promises = [];
        promises.push(CompetitionsService.fetchAll());
        promises.push(CategoriesService.fetchAll());

        $q.all(promises)
            .then(function (promiseResults) {
                ctrl.competitions = _.orderBy(promiseResults[0], ['name'], ['asc']);
                ctrl.photo.competition = ctrl.competitions[0];
                ctrl.allCategories = promiseResults[1];
                fillCategoryNames();
            })
            .catch(function (error) {
                console.log("Error: ", error.message);
                growl.error(error.message, {
                    referenceId: 1
                });
            });

        ctrl.competitionChanged = function () {
            fillCategoryNames();
        };

        // ctrl.uploadedPhoto = function (event) {
        //     var imageFile = event.target.files[0];
        //     var reader = new FileReader();
        //     reader.onload = ctrl.imageIsLoaded;
        //     reader.readAsDataURL(imageFile);
        // };

        // ctrl.imageIsLoaded = function (e) {
        //     $scope.uploadedPhotoHref = e.target.result;
        //     $scope.$apply();
        // };
        // $scope.file_changed = function (element) {
        //     console.log('Here');
        //     // var photofile = element.files[0];
        //     // var reader = new FileReader();
        //     // reader.onload = function (e) {
        //     //     $scope.$apply(function () {
        //     //         $scope.prev_img = e.target.result;
        //     //     });
        //     // };
        //     // reader.readAsDataURL(photofile);
        // };

        
        
        $scope.onLoad = function (e, reader, file, fileList, fileOjects, fileObj) {
            $scope.uploadedPhotoHref = $scope.file.base64;
            $scope.$apply();
        };

        ctrl.addImage = function () {
            //var image = $scope.file;
            ctrl.photo.photo = $scope.file.base64;
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

        function fillCategoryNames() {
            if (ctrl.photo.competition && ctrl.allCategories.length > 0) {
                ctrl.categories = _.filter(ctrl.allCategories, function (o) {
                    return o.competition.id == ctrl.photo.competition.id;
                });
                ctrl.photo.category = ctrl.categories[0];
            }
        }
    }
})();