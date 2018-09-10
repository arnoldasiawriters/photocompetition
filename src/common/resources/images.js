(function () {
    'use strict';

    angular
        .module('resources.images', [])
        .service('ImagesService', ImagesService);

    ImagesService.$inject = ['$q', 'UtilitiesService'];
    function ImagesService($q, UtilitiesService) {
        var svc = this;
        var imagesList = null;
        svc.error = { message: "" };

        /**
         * Function for fetching all images in images model
         */
        svc.fetchAll = function () {
            imagesList = [];
            var deferred = $q.defer();
            UtilitiesService
                .getListItems("images")
                .then(function (images) {
                    images = images.data;
                    _.forEach(images, function (v, k) {
                        var image = {};
                        image.id = v.id;
                        image.description = v.description;
                        image.image = v.image;
                        image.thumbnail = v.thumbnail;
                        image.imageClass = v.imageClass;
                        image.selected = v.selected;
                        image.voteCount = v.voteCount;
                        image.competition = { "id": v.competition.id, "name": v.competition.name };
                        image.category = {"id": v.category.id, "name": v.category.name}
                        imagesList.push(image);
                    });
                    deferred.resolve(imagesList);
                })
                .catch(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };

        /**
         * Function for adding image in the images model. It takes @param  {} photo
         */
        svc.addImage = function (photo) {
            var deferred = $q.defer();
            if (photo) {
                var image = {};
                image.image = photo.image;
                image.thumbnail = photo.thumbnail;
                image.description = photo.description;
                image.imageClass = "";
                image.selected = false;
                image.voteCount = 0;
                image.competition = { "id": photo.competition.id, "name": photo.competition.name };
                image.category = {"id": photo.category.id, "name": photo.category.name}

                UtilitiesService
                    .createListItem("images", image)
                    .then(function (response) {
                        imagesList.push(response.data);
                        deferred.resolve(imagesList);
                    })
                    .catch(function (error) {
                        deferred.reject(error);
                    });

            } else {
                svc.error.message = "Photo has not been provided.";
                deferred.reject(svc.error.message);
            }
            return deferred.promise;
        };

        /**
        * Function for getting images submitted for the competition category. It takes @param  {} category
        */
        svc.getSelectionImages = function (category) {            
            var deferred = $q.defer();
            svc.fetchAll()
                .then(function (images) {
                    var selectionImages = _.filter(images, function (o) {
                        return o.category.id === category.id;
                    });                    
                    deferred.resolve(selectionImages);
                }).catch(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };

        svc.submitSelection = function (selectedImages) {
            var deferred = $q.defer();
            _.forEach(selectedImages, function (o) {
                UtilitiesService
                    .updateListItem("images", o.id, o)
                    .then(function (response) {
                        _.forEach(imagesList, function (o) {
                            if (o.id == selectedImages.id) {
                                o = response.data;
                            }
                        });
                    })
                    .catch(function (error) {
                        deferred.reject(error);
                    });
            });
            deferred.resolve(selectedImages, imagesList);
            deferred.resolve(imagesList);
            return deferred.promise;
        };
    }
})();