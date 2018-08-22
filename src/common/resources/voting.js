(function () {
    'use strict';

    angular
        .module('resources.voting', [])
        .service('VotingService', VotingService);

    function VotingService() {
        var voting = this;
        voting.getVotingImages = function () {
            var imagePaths = [
                {
                    image: "images/voting/images/Finance.JPG",
                    thumbnail: "images/voting/thumbnails/Finance_t.JPG"
                },
                {
                    image: "images/voting/images/Laboratories.JPG",
                    thumbnail: "images/voting/thumbnails/Laboratories_t.JPG"
                },
                {
                    image: "images/voting/images/MainGate.JPG",
                    thumbnail: "images/voting/thumbnails/MainGate_t.JPG"
                },
                {
                    image: "images/voting/images/Reception.JPG",
                    thumbnail: "images/voting/thumbnails/Reception_t.JPG"
                },
                {
                    image: "images/voting/images/Finance.JPG",
                    thumbnail: "images/voting/thumbnails/Finance_t.JPG"
                },
                {
                    image: "images/voting/images/Laboratories.JPG",
                    thumbnail: "images/voting/thumbnails/Laboratories_t.JPG"
                },
                {
                    image: "images/voting/images/MainGate.JPG",
                    thumbnail: "images/voting/thumbnails/MainGate_t.JPG"
                },
                {
                    image: "images/voting/images/Reception.JPG",
                    thumbnail: "images/voting/thumbnails/Reception_t.JPG"
                },
                {
                    image: "images/voting/images/Finance.JPG",
                    thumbnail: "images/voting/thumbnails/Finance_t.JPG"
                },
                {
                    image: "images/voting/images/Laboratories.JPG",
                    thumbnail: "images/voting/thumbnails/Laboratories_t.JPG"
                },
                {
                    image: "images/voting/images/MainGate.JPG",
                    thumbnail: "images/voting/thumbnails/MainGate_t.JPG"
                },
                {
                    image: "images/voting/images/Reception.JPG",
                    thumbnail: "images/voting/thumbnails/Reception_t.JPG"
                }
            ];
            return imagePaths;
        }
    }
})();