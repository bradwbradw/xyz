'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('EditSpaceCtrl', function ($rootScope, $scope, $timeout, $q, $window, $state, $stateParams, $log, viewer, Space, Social, User, user, Server, Utility, Library, spaceId) {

    var space = Space.get({id: spaceId});
    var contributors = Space.contributors({id: spaceId});

    console.log('space is ', Space);
    console.log('User is ', User);
    console.log('user is ', user);

    var userSearchResults = [];

    var getContributors = function () {
      return contributors;
    };

    var deleteViaConfirm = function (service, object) {

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
        return !_.find(contributors, {id: u.id});
      });
    };

    var addToContributors = function (user) {
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

    var removeFromContributors = function (user) {
      Space.contributors.unlink({id: spaceId, fk: user.id})
        .$promise
        .then(function () {
          contributors = _.without(contributors, user);
        })
    };

    var saveEdits = function (space) {
      Space.prototype$updateAttributes({id: space.id}, space)
        .$promise
        .then(function () {
          $scope.editingName = false;
          $scope.space = Space.get({id: spaceId});
//          $state.transitionTo($state.current, $stateParams, {reload: true, inherit: false, notify: true});
        })
        .catch(function (err) {
          $log.error(err);
          alert('Sorry, there was an error saving');
        })

    };

    $scope.addToContributors = addToContributors;
    $scope.removeFromContributors = removeFromContributors;

    $scope.searchUsers = searchUsers;
    $scope.getUserSearchResults = getUserSearchResults;

    $scope.deleteViaConfirm = deleteViaConfirm;
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
