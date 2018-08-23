(function () {
    'use strict';
    /**
     * Utilities service provides utility services to other modules
     */
    angular
        .module('services.utilities', [])
        .service('UtilitiesService', UtilitiesService);

    function UtilitiesService() {
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
    }
})();