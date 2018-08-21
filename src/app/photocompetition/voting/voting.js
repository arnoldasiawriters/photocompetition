(function () {
    'use strict';

    angular
    .module('voting', ['services.utilities'])
    .controller('VotingController', VotingController);

    VotingController.$inject = ['UtilitiesService','growl'];
    function VotingController(UtilitiesService, growl) {
        var voting = this;
        voting.menuItems = UtilitiesService.menuItems(3);
        voting.pageTitle = "BARAZA PHOTO COMPETITION - PHOTO VOTING";
    }
})();