(function(){
    'use strict';
    /**
     * PhotoCompetitionApp module is the initial module in the application
     */
    angular
    .module('PhotoCompetitionApp', ['ngRoute', 'uploads', 'customdirectives', 'angular-growl'])
    .config(['growlProvider', GrowlProvider])
    .config(['$routeProvider', RouteProvider]);

    RouteProvider.$inject = ['$routeprovider'];
    function RouteProvider($routeprovider) {
            $routeprovider
            .when('/addUploads', {
                templateUrl: 'app/photocompetition/upload/uploads-add.tpl.html',
                controller: 'UploadsController'
            })
            .otherwise({
                redirectTo: '/addUploads'
            });
    }

    GrowlProvider.$inject = ['growlProvider'];
    function GrowlProvider(growlProvider) {
        growlProvider.globalTimeToLive(5000);
    }
})();