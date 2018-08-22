(function () {
    'use strict';

    angular
    .module('admindirectives', [])
    .directive('adminMenu', AdminMenuDirective);

    function AdminMenuDirective() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'app/photocompetition/administration/templates/competitions-adminmenu.tpl.html' 
        };
        return ddo;
    }

})();