(function () {
    'use strict';

    angular
    .module('voting', ['services.utilities', 'resources.voting'])
    .controller('VotingController', VotingController);

    VotingController.$inject = ['UtilitiesService','growl', 'VotingService', '$window'];
    function VotingController(UtilitiesService, growl, VotingService, $window) {
        var voting = this;
        voting.menuItems = UtilitiesService.menuItems(3);
        voting.pageTitle = "BARAZA PHOTO COMPETITION - PHOTO VOTING";
        voting.imagePaths = VotingService.getVotingImages();
        voting.submit = function () {
            growl.success('Your vote has been submitted successfully!', {
                title: 'Success Transaction', onclose: function () {
                    $window.location.reload();
                }
            });
        };   
    }
})();