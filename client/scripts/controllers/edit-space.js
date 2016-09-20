'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('EditSpaceCtrl', function ($rootScope, $scope, $timeout, $q, $window, $state, $log, viewer, Space, Social, User, user, Server, Utility, spaceId) {


    console.log('space is ', Space);
    var space = Space.get({id: spaceId});
    var contributors = Space.contributors({id: spaceId});
    var getContributors = function () {
      return contributors;
    };

    $rootScope.$on('open-search', function(){
      $scope.sidebarClosed = false;
    });

    $scope.deleteViaConfirm = function (service, object) {

      if ($window.confirm('are you sure you want to delete the space?')) {
        return service.destroyById({id: object.id})
          .$promise
          .then(User.fetchSpaces)
          .then(function () {
            $state.go('base.landing');
          })
          .catch(function (err) {
            return $q.reject(err);
          });
      }

    };

    var sidebarClosed = true;
    var userSearchResults = [];

    $scope.searchUsers = function (query) {
      if (query === '') {
        userSearchResults = [];
      } else {
        Server.searchUsers(query)
          .then(function (results) {
            userSearchResults = results;
          })
      }
    };

    $scope.getUserSearchResults = function () {
      return _.filter(userSearchResults, function (user) {
        return !_.find(getContributors(), {id: user.id});
      });
    };

    $scope.addToContributors = function (user) {
      Space.contributors.link({id: spaceId, fk: user.id}, null)
        .$promise
        .then(function () {
          contributors.push(user);
          contributors = _.uniq(contributors);

        })
        .catch(function (err) {

          $log.error(err);
          Utility.showError(err);
        });

    };//addToContributors;

    $scope.removeFromContributors = function (user) {
      Space.contributors.destroyById({id: spaceId, fk: user.id})
        .$promise
        .then(function () {
          contributors = _.without(contributors, user);
        })
    };

    $scope.editingName = false;
    var saveEdits = function (space) {
      Space.prototype$updateAttributes({id: space.id}, space)
        .$promise
        .then(function(){
          $scope.editingName = false;
          $scope.space = Space.get({id: spaceId});
        })
        .catch(function (err) {
          $log.error(err);
          alert('Sorry, there was an error saving');
        })

    };

    $scope.saveEdits = saveEdits;
    $scope.userSearchResults = userSearchResults;

    $scope.Utility = Utility;

    $scope.viewer = viewer;
    $scope.space = space;
    $scope.Space = Space;

    $scope.Server = Server;
    $scope.getContributors = getContributors;

    $scope.FB = Social.FB
  });
