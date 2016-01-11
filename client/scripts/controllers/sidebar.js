'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('SidebarCtrl', function ($scope, $timeout,viewer, space, Social) {

    $scope.viewer = viewer;
    $scope.space = space;


    $scope.connectingToFB = true;

    var refreshFB = function(){

    Social.FB.updateLoginStatus()
      .then(function (res) {
        // res: FB.getLoginStatus response
        // https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus
         $scope.loginStatus = res;
      })
      .then(function () {
        Social.FB.loadMe;
      })
      .catch(function(err){
        alert(err);
      })
      .finally(function(){
        $scope.connectingToFB = false;
      });
    };

    refreshFB();

    $scope.refreshFB = refreshFB;

    $scope.FB = Social.FB
  });
