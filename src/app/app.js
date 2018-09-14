(function () {
    'use strict';
    /**
     * PhotoCompetitionApp module is the initial module in the application
     */
    angular
        .module('PhotoCompetitionApp', ['ngRoute', 'customdirectives', 'angular-growl', 'images', 'selection',
            'voting', 'results', 'categories', 'competitions', 'parameters', 'angular-flexslider',
            'directives.dirPagination', 'ui.bootstrap', 'ui.bootstrap.dialogs', 'ngAnimate','naif.base64'])
        .config(['growlProvider', GrowlProvider])
        .config(['$routeProvider', RouteProvider]);

    RouteProvider.$inject = ['$routeprovider'];
    function RouteProvider($routeprovider) {
        $routeprovider
            .when('/addUploads', {
                templateUrl: 'app/photocompetition/images/images-add.tpl.html',
                controller: 'ImagesController as ctrl'
            })
            .when('/addSelection', {
                templateUrl: 'app/photocompetition/images/images-selection.tpl.html',
                controller: 'SelectionController as ctrl'
            })
            .when('/addVoting', {
                templateUrl: 'app/photocompetition/images/images-voting.tpl.html',
                controller: 'VotingController as ctrl'
            })
            .when('/addResults', {
                templateUrl: 'app/photocompetition/images/images-results.tpl.html',
                controller: 'ResultsController as ctrl'
            })

            // Routes handling categories
            .when('/listCategories', {
                templateUrl: 'app/photocompetition/categories/categories-list.tpl.html',
                controller: 'CategoriesController as ctrl'
            })
            .when('/addCategory', {
                templateUrl: 'app/photocompetition/categories/categories-add.tpl.html',
                controller: 'CategoriesController as ctrl'
            })
            .when('/editCategory/:id', {
                templateUrl: 'app/photocompetition/categories/categories-edit.tpl.html',
                controller: 'CategoriesController as ctrl'
            })

            // Routes handling competitions
            .when('/listCompetitions', {
                templateUrl: 'app/photocompetition/competitions/competitions-list.tpl.html',
                controller: 'CompetitionsController as ctrl'
            })
            .when('/addCompetition', {
                templateUrl: 'app/photocompetition/competitions/competitions-add.tpl.html',
                controller: 'CompetitionsController as ctrl'
            })
            .when('/editCompetition/:id', {
                templateUrl: 'app/photocompetition/competitions/competitions-edit.tpl.html',
                controller: 'CompetitionsController as ctrl'
            })

            //Routes for handling periods
            .when('/listPeriods', {
                templateUrl: 'app/photocompetition/periods/periods-list.tpl.html',
                controller: 'PeriodsController as ctrl'
            })
            .when('/addPeriod', {
                templateUrl: 'app/photocompetition/periods/periods-add.tpl.html',
                controller: 'PeriodsController as ctrl'
            })
            .when('/editPeriod/:id', {
                templateUrl: 'app/photocompetition/periods/periods-edit.tpl.html',
                controller: 'PeriodsController as ctrl'
            })

            //Routes for handling parameters
            .when('/editParameters', {
                templateUrl: 'app/photocompetition/parameters/parameters-edit.tpl.html',
                controller: 'ParametersController  as ctrl'
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

