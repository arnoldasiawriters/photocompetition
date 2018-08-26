(function () {
    'use strict';
    /**
     * PhotoCompetitionApp module is the initial module in the application
     */
    angular
        .module('PhotoCompetitionApp', ['ngRoute', 'customdirectives', 'angular-growl', 'uploads', 'selection',
            'voting', 'results', 'categories', 'competitions', 'periods', 'parameters', 'angular-flexslider',
            'directives.dirPagination', 'ui.bootstrap', 'ui.bootstrap.dialogs', 'ngAnimate'])
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

            // Routes handling categories
            .when('/listCategories', {
                templateUrl: 'app/photocompetition/administration/categories/categories-list.tpl.html',
                controller: 'CategoriesController'
            })
            .when('/addCategory', {
                templateUrl: 'app/photocompetition/administration/categories/categories-add.tpl.html',
                controller: 'CategoriesController'
            })
            .when('/editCategory/:id', {
                templateUrl: 'app/photocompetition/administration/categories/categories-edit.tpl.html',
                controller: 'CategoriesController'
            })

            // Routes handling competitions
            .when('/listCompetitions', {
                templateUrl: 'app/photocompetition/administration/competitions/competitions-list.tpl.html',
                controller: 'CompetitionsController'
            })
            .when('/addCompetition', {
                templateUrl: 'app/photocompetition/administration/competitions/competitions-add.tpl.html',
                controller: 'CompetitionsController'
            })
            .when('/editCompetition/:id', {
                templateUrl: 'app/photocompetition/administration/competitions/competitions-edit.tpl.html',
                controller: 'CompetitionsController'
            })

            //Routes for handling periods
            .when('/listPeriods', {
                templateUrl: 'app/photocompetition/administration/periods/periods-list.tpl.html',
                controller: 'PeriodsController'
            })
            .when('/addPeriod', {
                templateUrl: 'app/photocompetition/administration/periods/periods-add.tpl.html',
                controller: 'PeriodsController'
            })
            .when('/editPeriod/:id', {
                templateUrl: 'app/photocompetition/administration/periods/periods-edit.tpl.html',
                controller: 'PeriodsController'
            })

            //Routes for handling parameters
            .when('/editParameters', {
                templateUrl: 'app/photocompetition/administration/parameters/parameters-edit.tpl.html',
                controller: 'ParametersController'
            })
            .otherwise({
                redirectTo: '/addUploads'
            });
    }

    GrowlProvider.$inject = ['growlProvider'];
    function GrowlProvider(growlProvider) {
        growlProvider.globalTimeToLive(5000);
        growlProvider.globalDisableCountDown(true);
    }
})();

