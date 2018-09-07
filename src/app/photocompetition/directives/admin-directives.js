(function () {
    'use strict';

    angular
    .module('admindirectives', [])
    .directive('adminMenu', AdminMenuDirective)
    .directive('addButton', AddButtonDirective);

    function AddButtonDirective() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'app/photocompetition/templates/administration-addbtn.tpl.html',
            scope: {
                btnAddHref: '='
            }
        };
        return ddo;
    }

    function AdminMenuDirective() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'app/photocompetition/templates/competitions-adminmenu.tpl.html' 
        };
        return ddo;
    }

})();