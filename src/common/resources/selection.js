(function () {
    'use strict';

    angular
        .module('resources.selection', [])
        .service('SelectionService', SelectionService);

    function SelectionService() {
        var selection = this;

        selection.getSelectionImages = function () {
            var imagePaths = [
                {
                    image: "images/selection/images/Finance.JPG",
                    thumbnail: "images/selection/thumbnails/Finance_t.JPG"
                }, {
                    image: "images/selection/images/Laboratories.JPG",
                    thumbnail: "images/selection/thumbnails/Laboratories_t.JPG"
                }, {
                    image: "images/selection/images/MainGate.JPG",
                    thumbnail: "images/selection/thumbnails/MainGate_t.JPG"
                }, {
                    image: "images/selection/images/Reception.JPG",
                    thumbnail: "images/selection/thumbnails/Reception_t.JPG"
                }, {
                    image: "images/selection/images/Finance.JPG",
                    thumbnail: "images/selection/thumbnails/Finance_t.JPG"
                }, {
                    image: "images/selection/images/Laboratories.JPG",
                    thumbnail: "images/selection/thumbnails/Laboratories_t.JPG"
                }, {
                    image: "images/selection/images/MainGate.JPG",
                    thumbnail: "images/selection/thumbnails/MainGate_t.JPG"
                }, {
                    image: "images/selection/images/Reception.JPG",
                    thumbnail: "images/selection/thumbnails/Reception_t.JPG"
                }, {
                    image: "images/selection/images/Finance.JPG",
                    thumbnail: "images/selection/thumbnails/Finance_t.JPG"
                }, {
                    image: "images/selection/images/Laboratories.JPG",
                    thumbnail: "images/selection/thumbnails/Laboratories_t.JPG"
                }, {
                    image: "images/selection/images/MainGate.JPG",
                    thumbnail: "images/selection/thumbnails/MainGate_t.JPG"
                }, {
                    image: "images/selection/images/Reception.JPG",
                    thumbnail: "images/selection/thumbnails/Reception_t.JPG"
                }
            ];
            return imagePaths;
        }
    }
})();