(function () {
    'use strict';
    /**
     * PhotoCompetitionApp module is the initial module in the application
     */
    angular
        .module('PhotoCompetitionApp', ['ngRoute', 'customdirectives', 'angular-growl', 'uploads', 'selection',
            'voting', 'results', 'administration'])
        .config(['growlProvider', GrowlProvider])
        .config(['$routeProvider', RouteProvider]);

    RouteProvider.$inject = ['$routeprovider'];
    function RouteProvider($routeprovider) {
        $routeprovider
            .when('/addUploads', {
                templateUrl: 'app/photocompetition/upload/uploads-add.tpl.html',
                controller: 'UploadsController'
            })
            .when('/addSelection', {
                templateUrl: 'app/photocompetition/selection/selection-add.tpl.html',
                controller: 'SelectionController'
            })
            .when('/addVoting', {
                templateUrl: 'app/photocompetition/voting/voting-add.tpl.html',
                controller: 'VotingController'
            })
            .when('/addResults', {
                templateUrl: 'app/photocompetition/results/results-add.tpl.html',
                controller: 'ResultsController'
            })
            .when('/addAdministration', {
                templateUrl: 'app/photocompetition/administration/administration-add.tpl.html',
                controller: 'AdministrationController'
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