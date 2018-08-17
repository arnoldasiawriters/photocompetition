(function () {
    'use strict';
    //CustomDirective module holds the applications custom directives.
    angular.module('customdirectives', [])
        .directive('mainMenu', MainMenuDirective)
        .directive('pageTitle', PageTitleDirective);
    /**
     * MainMenuDirective serves the main-menu.dir.html template with data.
     */
    function MainMenuDirective() {
        var ddo = {
            templateUrl: "common/directives/mainmenu/main-menu.dir.html",
            restrict: 'E',
            scope: {
                menuItems: "=menuItems"
            }
        };
        return ddo;
    }
    /**
     * PageTitleDirective serves the page-title.dir.html template with data
     */
    function PageTitleDirective() {
        var ddo = {
            templateUrl: "common/directives/pagetitle/page-title.dir.html",
            restrict: 'E',
            scope: {
                pageTitle: "=pageTitle"
            }
        };
        return ddo;
    }
})();