(function(){
    'use strict';
    /**
     * PhotoCompetitionApp module is the initial module in the application
     */
    angular
    .module('PhotoCompetitionApp', ['ngRoute', 'uploads', 'customdirectives'])
    .config(['$routeProvider', function($routeprovider){
        $routeprovider
        .when('/addUploads', {
            templateUrl: 'app/photocompetition/upload/uploads-add.tpl.html',
            controller: 'UploadsController'
        })
        .otherwise({
            redirectTo: '/addUploads'
        });
    }]);
})();