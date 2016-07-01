'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('SidebarCtrl', function ($scope, $timeout, $q, $window, $state, viewer, space, Space, Social, User, user, Server, Utility, contributors) {


    $scope.deleteViaConfirm = function (service, object) {
      console.log('...');

      if ($window.confirm('are you sure you want to delete the space?')) {
        return service.destroyById({id: object.id}, _.noop)
          .$promise
          .then(User.fetchSpaces)
          .then(function () {
            $state.go('base');
          })
          .catch(function (err) {
            return $q.reject(err);
          });
      }

    };

    var sidebarClosed = true;
    var userSearchResults = [];

    $scope.searchUsers = function(query){
      if(query ===''){
          userSearchResults = [];
        return;
      }
      Server.searchUsers(query)
        .then(function(results){
          userSearchResults = results;
        })
    };

    $scope.getUserSearchResults = function(){
      return userSearchResults;
    };

    var addToContributors = function(user){
      return Server.addContributorToSpace(space.id, user.id)
        .then(function(result){
          $scope.contributors = result;
        });
    };

    $scope.addToContributors = addToContributors;
    $scope.userSearchResults = userSearchResults;

    $scope.Utility = Utility;
    $scope.sidebarClosed = sidebarClosed;

    $scope.viewer = viewer;
    $scope.space = space;
    $scope.Space = Space;

    $scope.Server = Server;
    $scope.contributors = contributors;

    $scope.FB = Social.FB
  });
