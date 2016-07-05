'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('SidebarCtrl', function ($scope, $timeout, $q, $window, $state, viewer, Space, Social, User, user, Server, Utility, spaceId) {


    console.log('space is ', Space);
    var space = Space.get({id:spaceId});
    var contributors = Space.contributors({id:spaceId});
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
/*
    var addToContributors = function(user){
      return Server.addContributorToSpace(space.id, user.id)
        .then(function(result){
          $scope.contributors = result;
        });
    };*/

    var count2 = Space.contributors.count({id:spaceId});

    $scope.addToContributors = function(user){
      Space.contributors.link({id:spaceId, fk:user.id})
        .$promise
        .then(function(){
          contributors.push(user);
        })
        .catch(Utility.showError);

    };//addToContributors;
    $scope.removeFromContributors = function(user){
      Space.contributors.destroyById({id:spaceId, fk:user.id})
        .$promise
        .then(function(){
        contributors = _.omit(contributors,{id:user.id});
      })
    };
    $scope.userSearchResults = userSearchResults;

    $scope.Utility = Utility;
    $scope.sidebarClosed = sidebarClosed;

    $scope.viewer = viewer;
    $scope.space = space;
    $scope.Space = Space;

    $scope.Server = Server;
    $scope.contributors = contributors;
    $scope.count2 = count2;

    $scope.FB = Social.FB
  });
