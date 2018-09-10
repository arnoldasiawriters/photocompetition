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
            { menuId: 5, title: "Administration", class: "", url: "#listCompetitions", icon: "fa-wrench" }];
            _.set(_.find(menuitems, { menuId: activeMenu }), "class", "active");
            return menuitems;
        };

        utils.getTemplateURL = function (ListName) {
            var templateUrl = "";
            switch (ListName) {
                case "photocategories":
                    templateUrl = "http://localhost:4000/photocategories";
                    break;
                case "periods":
                    templateUrl = "http://localhost:4000/periods";
                    break;
                case "competitions":
                    templateUrl = "http://localhost:4000/competitions";
                    break;
                case "images":
                    templateUrl = "http://localhost:4000/images";
                    break;
                case "parameters":
                    templateUrl = "http://localhost:4000/parameters";
                    break;
                default:
                    templateUrl = "";
                    break;
            }
            return templateUrl;
        };

        utils.getListItems = function (ListName) {
            var items = $http({
                method: "GET",
                url: utils.getTemplateURL(ListName)
            });
            return items;
        };

        utils.createListItem = function (ListName, bodyContent) {
            var items = $http({
                url: utils.getTemplateURL(ListName),
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                data: JSON.stringify(bodyContent)
            })
            return items;
        };

        utils.updateListItem = function (ListName, itemId, bodyContent) {            
            var items = $http({
                url: utils.getTemplateURL(ListName) + "/" + itemId,
                method: "PUT",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                data: JSON.stringify(bodyContent)
            })
            return items;
        };

        utils.deleteListItem = function (ListName, itemId) {
            var items = $http({
                url: utils.getTemplateURL(ListName) + "/" + itemId,
                method: "DELETE",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            return items;
        };
    }
})();