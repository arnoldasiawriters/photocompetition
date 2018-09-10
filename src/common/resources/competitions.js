(function () {
    'use strict';

    angular
        .module('resources.admin.competitions', [])
        .service('CompetitionsService', CompetitionsService);

    CompetitionsService.$inject = ['$q', 'UtilitiesService'];
    function CompetitionsService($q, UtilitiesService) {
        var svc = this;
        var competitionsList = null;
        svc.error = { message: "" };

        /**
         * Function for fetching all competitions in competitions model
         */
        svc.fetchAll = function () {
            var deferred = $q.defer();
            competitionsList = [];
            UtilitiesService
                .getListItems("competitions")
                .then(function (competitions) {
                    competitions = competitions.data;
                    _.forEach(competitions, function (v, k) {
                        var competition = {};
                        competition.id = v.id;
                        competition.name = v.Name;
                        competition.startdate = new Date(v.StartDate);
                        competition.enddate = new Date(v.EndDate);
                        competition.uploadenddate = new Date(v.EndofUploadDate);
                        competition.selectionenddate = new Date(v.EndofSelectionDate);
                        competition.votingenddate = new Date(v.EndofVotingDate);
                        competitionsList.push(competition);
                    });
                    deferred.resolve(competitionsList);
                })
                .catch(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };

        /**
         * Function for adding competition in the model. It takes @param  {} competition
         */
        svc.addCompetition = function (competition) {
            var deferred = $q.defer();
            svc
                .fetchAll().then(function (competitions) {
                    var competitionExists = _.some(competitions, function (c) {
                        return c.name === competition.name;
                    });
                    if (!competitionExists) {
                        UtilitiesService
                            .createListItem("competitions", competition)
                            .then(function (response) {
                                competition.id = response.data.id;
                                competition.name = response.data.Name;
                                competition.startdate = new Date(response.data.StartDate);
                                competition.enddate = new Date(response.data.EndDate);
                                competition.uploadenddate = new Date(response.data.EndofUploadDate);
                                competition.selectionenddate = new Date(response.data.EndofSelectionDate);
                                competition.votingenddate = new Date(response.data.EndofVotingDate);
                                competitionsList.push(competition);
                                deferred.resolve(competitionsList);
                            })
                            .catch(function (error) {
                                deferred.reject(error);
                            });
                    } else {
                        svc.error.message = "Competition is already registered!";
                        deferred.reject(svc.error);
                    }
                });
            return deferred.promise;
        };

        /**
         * Function for editing a competition in the competitions model. 
         * It takes parameter @param  {} competition which is the new competition.
         */
        svc.editCompetition = function (competition) {
            var deferred = $q.defer();
            var comp = {};
            comp.id = competition.id;
            comp.Name = competition.name;
            comp.StartDate = competition.startdate;
            comp.EndDate = competition.enddate;
            comp.EndofUploadDate = competition.uploadenddate;
            comp.EndofSelectionDate = competition.selectionenddate;
            comp.EndofVotingDate = competition.votingenddate;

            UtilitiesService
                .updateListItem("competitions", comp.id, comp)
                .then(function (response) {
                    _.forEach(competitionsList, function (o) {
                        if (o.id == competition.id) {
                            o = competition;
                        }
                    });
                    deferred.resolve(competitionsList);
                })
                .catch(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };

        /**
         * Function for deleting a competition from the competition list.
         * It takes @param  {} competition which is to be deleted
         */
        svc.removeCompetition = function (competition) {
            var deferred = $q.defer();
            svc
                .fetchAll()
                .then(function (competitions) {
                    var competitionExists = _.some(competitions, function (c) {
                        return c.name === competition.name;
                    });
                    if (competitionExists) {
                        UtilitiesService
                            .deleteListItem("competitions", competition.id)
                            .then(function (response) {
                                _.remove(competitionsList, function (o) {
                                    return o.id === competition.id;
                                });
                                deferred.resolve(competitionsList);
                            })
                            .catch(function (error) {
                                deferred.reject(error);
                            });
                    } else {
                        svc.error.message = "Competition has already been deleted!";
                        deferred.reject(svc.error);
                    }
                })
                .catch(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };
    }
})();