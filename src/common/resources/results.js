(function () {
    'use strict';

    angular
        .module('resources.results', [])
        .service('ResultsService', ResultsService);

    function ResultsService() {
        var results = this;

        results.getResultsImages = function () {
            var imagePaths = [
                {
                    image: "images/results/images/Finance.JPG",
                    thumbnail: "images/results/thumbnails/Finance_t.JPG"
                }, {
                    image: "images/results/images/Laboratories.JPG",
                    thumbnail: "images/results/thumbnails/Laboratories_t.JPG"
                }, {
                    image: "images/results/images/MainGate.JPG",
                    thumbnail: "images/results/thumbnails/MainGate_t.JPG"
                }, {
                    image: "images/results/images/Reception.JPG",
                    thumbnail: "images/results/thumbnails/Reception_t.JPG"
                }, {
                    image: "images/results/images/Finance.JPG",
                    thumbnail: "images/results/thumbnails/Finance_t.JPG"
                }, {
                    image: "images/results/images/Laboratories.JPG",
                    thumbnail: "images/results/thumbnails/Laboratories_t.JPG"
                }, {
                    image: "images/results/images/MainGate.JPG",
                    thumbnail: "images/results/thumbnails/MainGate_t.JPG"
                }, {
                    image: "images/results/images/Reception.JPG",
                    thumbnail: "images/results/thumbnails/Reception_t.JPG"
                }, {
                    image: "images/results/images/Finance.JPG",
                    thumbnail: "images/results/thumbnails/Finance_t.JPG"
                }, {
                    image: "images/results/images/Laboratories.JPG",
                    thumbnail: "images/results/thumbnails/Laboratories_t.JPG"
                }, {
                    image: "images/results/images/MainGate.JPG",
                    thumbnail: "images/results/thumbnails/MainGate_t.JPG"
                }, {
                    image: "images/results/images/Reception.JPG",
                    thumbnail: "images/results/thumbnails/Reception_t.JPG"
                }
            ];
            return imagePaths;
        }
    }
})();