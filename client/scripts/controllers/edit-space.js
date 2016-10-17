'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('EditSpaceCtrl', function ($rootScope, $scope, $timeout, $q, $window, $state, $stateParams, $log, viewer, space, Social, User, user, Server, Utility, Library, Spaces, Space, spaceId) {

    var userSearchResults = [];

    var getContributors = function () {
      return space.contributors;
    };

    var deleteViaConfirm = function (service, object) {

      if ($window.confirm('are you sure you want to delete the space?')) {
        return service.destroyById({id: object.id})
          .$promise
          .then(Spaces.removeFromMap)
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
        return !_.find(space.contributors, {id: u.id});
      });
    };

    var addToContributors = function (user) {
      Space.contributors.link({id: spaceId, fk: user.id}, null)
        .$promise
        .then(function () {
          space.contributors.push(user);
          space.contributors = _.uniq(space.contributors);
          Spaces.extend(space);
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
          space.contributors = _.without(space.contributors, user);
          Spaces.extend(space);
        });
    };

    var saveEdits = function (updatedSpace) {
      Space.prototype$updateAttributes({id: space.id}, updatedSpace)
        .$promise
        .then(function () {
          Spaces.addToMap(_.extend(space, updatedSpace))
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
    $scope.Spaces = Spaces;

    $scope.space = _.cloneDeep(space);

    $scope.Server = Server;
    $scope.getContributors = getContributors;

    $scope.FB = Social.FB
  });
