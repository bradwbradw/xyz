'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:SocialtestctrlCtrl
 * @description
 * # SocialtestctrlCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('SocialTestCtrl', function ($scope, Social) {


    Social.FB.updateLoginStatus()
      .then(function (res) {
        // res: FB.getLoginStatus response
        // https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus
        $scope.loginStatus = res;
      })
      .then(function(data ){
        Social.FB.loadMe()
      });

    $scope.getYoutube = function(){

    };

    $scope.FB = Social.FB;

  });
