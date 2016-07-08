'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('SidebarCtrl', function ($scope, $timeout, $q, $window, $state, $log, viewer, Space, Social, User, user, Server, Utility, spaceId) {


    console.log('space is ', Space);
    var space = Space.get({id: spaceId});
    var contributors = Space.contributors({id: spaceId});
    var getContributors = function(){
      return contributors;
    };

    $scope.deleteViaConfirm = function (service, object) {
      console.log('...');

      if ($window.confirm('are you sure you want to delete the space?')) {
        return service.destroyById({id: object.id}, _.noop)
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
        return;
      } else {
        Server.searchUsers(query)
          .then(function (results) {
            userSearchResults = results;
          })
      }
    };

    $scope.getUserSearchResults = function () {
      return _.filter(userSearchResults, function(user){
        return !_.find(getContributors(), {id:user.id});
      });
    };
    /*
     var addToContributors = function(user){
     return Server.addContributorToSpace(space.id, user.id)
     .then(function(result){
     $scope.contributors = result;
     });
     };*/

    var count2 = Space.contributors.count({id: spaceId});

    $scope.addToContributors = function (user) {
      Space.contributors.link({id: spaceId, fk: user.id}, null)
        .$promise
        .then(function () {
          contributors.push(user);
          contributors = _.uniq(contributors);

        })
        .catch(function(err){

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
    $scope.userSearchResults = userSearchResults;

    $scope.Utility = Utility;
    $scope.sidebarClosed = sidebarClosed;

    $scope.viewer = viewer;
    $scope.space = space;
    $scope.Space = Space;

    $scope.Server = Server;
    $scope.getContributors = getContributors;
    $scope.count2 = count2;

    $scope.FB = Social.FB
  });
