'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('EditSpaceCtrl', function ($rootScope, $scope, $timeout, $q, $window, $state, $stateParams, $log, viewer, Social, User, user, Server, Utility, Library, Spaces) {

    var userSearchResults = [];

    var spaceEdits = {
      name: _.get(Spaces.current(), 'name'),
      public: _.get(Spaces.current(), 'public')

    };


    var deleteViaConfirm = function () {

      var space = Spaces.current();
      var name = _.get(space, 'name', '(untitled)');
      if ($window.confirm('are you sure you want to delete the space "' + name + '"?')) {
        return Spaces.deleteForever(space)
          .then(function () {
            $state.go('base.landing');
          })
      }
    };

    var searchUsers = function (query) {
      if (query === '') {
        userSearchResults = [];
      } else {
        Server.searchUsers(query)
          .then(function (results) {
            userSearchResults = _.filter(results, function (u) {
              return u.id !== user.id;
            });
            $log.log('before', results);
            $log.log('after', userSearchResults);
          })
      }
    };

    var getUserSearchResults = function () {
      return _.filter(userSearchResults, function (u) {
        return !_.find(Spaces.current().contributors, {id: u.id});
      });
    };

    var addToContributors = function (user) {
      Spaces.saveAndUpdateMap('addToContributors', [user], {
        contributors: _.union(Spaces.current().contributors, [user])
      });
    };

    var removeFromContributors = function (user) {
      Spaces.saveAndUpdateMap('removeFromContributors', [user], {
        contributors: _.without(Spaces.current().contributors, user)
      })
    };

    var saveEdits = function (edits) {
      Spaces.saveAndUpdateMap('update', [edits], edits);
    };

    $scope.addToContributors = addToContributors;
    $scope.removeFromContributors = removeFromContributors;

    $scope.searchUsers = searchUsers;
    $scope.getUserSearchResults = getUserSearchResults;

    $scope.deleteViaConfirm = deleteViaConfirm;
    $scope.saveEdits = saveEdits;

    $scope.Utility = Utility;

    $scope.viewer = viewer;
    $scope.Spaces = Spaces;

    $scope.spaceEdits = spaceEdits;

    $scope.Server = Server;

    $scope.FB = Social.FB
  });
