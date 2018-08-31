(function () {
    'use strict';
    /**
     * Utilities service provides utility services to other modules
     */
    angular
        .module('services.utilities', [])
        .service('UtilitiesService', UtilitiesService);

    UtilitiesService.$inject = ['$http'];
    function UtilitiesService($http) {
        var utils = this;
        /**
         * Function returns menu items specifying the active menu item
         * @param  {} activeMenu is the active menu
         */
        utils.menuItems = function (activeMenu) {
            var menuitems = [{ menuId: 1, title: "Upload", class: "", url: "#addUploads", icon: "fa-upload" },
            { menuId: 2, title: "Selection", class: "", url: "#addSelection", icon: "fa-search" },
            { menuId: 3, title: "Voting", class: "", url: "#addVoting", icon: "fa-edit" },
            { menuId: 4, title: "Results", class: "", url: "#addResults", icon: "fa-align-justify" },
            { menuId: 5, title: "Administration", class: "", url: "#listCategories", icon: "fa-wrench" }];

            _.set(_.find(menuitems, { menuId: activeMenu }), "class", "active");
            return menuitems;
        };

        utils.getListItems = function (ListName) {
            var templateUrl = "";
            switch (ListName) {
                case ListName: "categories"
                    templateUrl = "http://localhost:4000/categories";
                    break;
                case ListName: "periods"
                    templateUrl = "http://localhost:4000/periods";
                    break;
                case ListName: "competitions"
                    templateUrl = "http://localhost:4000/competitions";
                    break;
                case ListName: "images"
                    templateUrl = "http://localhost:4000/images";
                    break;
                default:
                    templateUrl = "";
                    break;
            }
            var items = $http({
                method: "GET",
                url: templateUrl
            });
            return items;
        };

        utils.createListItem = function (ListName, bodyContent) {
            var templateUrl = "";
            switch (ListName) {
                case ListName: "categories"
                    templateUrl = "http://localhost:4000/categories";
                    break;
                case ListName: "periods"
                    templateUrl = "http://localhost:4000/periods";
                    break;
                case ListName: "competitions"
                    templateUrl = "http://localhost:4000/competitions";
                    break;
                case ListName: "images"
                    templateUrl = "http://localhost:4000/images";
                    break;
                default:
                    templateUrl = "";
                    break;
            }
            
            var items = $http({
                url: templateUrl,
                method: "POST",
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "Content-Type": "application/json;"
                },
                data: JSON.stringify(bodyContent)
            });
            return items;
        };
    }
})();