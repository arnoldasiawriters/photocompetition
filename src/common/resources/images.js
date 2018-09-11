(function () {
    'use strict';

    angular
        .module('resources.images', [])
        .service('ImagesService', ImagesService);

    ImagesService.$inject = ['$q', 'UtilitiesService'];
    function ImagesService($q, UtilitiesService) {
        var svc = this;
        var imagesList = null;
        var imagesVotedList = null;
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
                        image.category = { "id": v.category.id, "name": v.category.name }
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
         * Function for fetching image votes for user for category
         * @param  {} category
         * @param  {} user
         */
        svc.fetchVotesByUserForCategory = function (category, user) {
            imagesVotedList = [];
            var deferred = $q.defer();
            UtilitiesService
                .getListItems("imagevotes")
                .then(function (imagevotes) {
                    imagevotes = imagevotes.data;
                    _.forEach(imagevotes, function (v, k) {
                        if (v.image.category.id == category.id && v.voteby.id == user.id) {
                            var imagevote = {};
                            imagevote.id = v.id;
                            imagevote.image = {
                                "id": v.image.id, "category": {
                                    "id": v.image.category.id,
                                    "name": v.image.category.name
                                }
                            };
                            imagevote.voteby = { "id": v.voteby.id, "name": v.voteby.name }
                            imagevote.votedate = new Date(v.votedate);
                            imagesVotedList.push(imagevote);
                        }
                    });
                    deferred.resolve(imagesVotedList);
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
                image.category = { "id": photo.category.id, "name": photo.category.name }

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

        /**
        * Function for submitting selected images for voting for the competition category. It takes @param  {} selectedImages
        */
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
            deferred.resolve(imagesList);
            return deferred.promise;
        };

        /**
        * Function for getting images selected for the competition category for voting. It takes @param  {} category
        */
        svc.getVotingImages = function (category) {
            var deferred = $q.defer();
            svc.fetchAll()
                .then(function (images) {
                    var votingImages = _.filter(images, function (o) {
                        return o.category.id === category.id && o.selected === true;
                    });
                    deferred.resolve(votingImages);
                }).catch(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };

        /**
         * Function for returning selected images patching the parameter imagevoted to identify if image is voted.
         * @param  {} category
         * @param  {} user
         */
        svc.getVotingImagesWithVoteData = function (category, user) {
            var deferred = $q.defer();
            svc.fetchVotesByUserForCategory(category, user)
                .then(function (votedimages) {
                    svc.getVotingImages(category)
                        .then(function (votingimages) {
                            _.forEach(votingimages, function (o) {
                                var imageVoted = _.some(votedimages, function (c) {
                                    return c.image.id === o.id;
                                });
                                if (imageVoted) {
                                    o.imagevoted = true;
                                } else {
                                    o.imagevoted = false;
                                }
                            });
                            deferred.resolve(votingimages);
                        })
                        .catch(function (error) {
                            deferred.reject(error);
                        });
                })
                .catch(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };

        /**
         * Function for submitting voted images
         * @param  {} votedImages
         * @param  {} currentUser
         */
        svc.submitVotes = function (votedImages, currentUser, category) {
            var deferred = $q.defer();
            svc.fetchVotesByUserForCategory(category, currentUser)
                .then(function (imageVotes) {
                    if (imageVotes.length > 0) {
                        svc.error.message = "You have already submitted your voted for the category!";
                        deferred.reject(svc.error);
                    } else {
                        _.forEach(votedImages, function (v, k) {
                            if (v.imagevoted) {
                                var imagevote = {};
                                imagevote.image = {
                                    id: v.id,
                                    category: {
                                        id: v.category.id,
                                        name: v.category.name
                                    }
                                };
                                imagevote.voteby = { id: currentUser.id, name: currentUser.name };
                                imagevote.votedate = new Date();
                                v.voteCount += 1;
                                delete v.imagevoted;
                                UtilitiesService
                                    .createListItem("imagevotes", imagevote)
                                    .then(function (savedVote) {
                                        console.log(v.id, v);
                                        
                                        UtilitiesService
                                            .updateListItem("images", v.id, v)
                                            .then(function (response) {
                                            })
                                            .catch(function (error) {
                                                deferred.reject(error);
                                            });
                                    })
                                    .catch(function (error) {
                                        deferred.reject(error);
                                    });
                            }
                        });
                        deferred.resolve(votedImages);
                    }
                })
                .catch(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };
    }
})();