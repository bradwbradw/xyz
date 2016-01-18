'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:SocialtestctrlCtrl
 * @description
 * # SocialtestctrlCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('SocialTestCtrl', function ($scope, Social, $window, $log) {

    $scope.data = false;

    $scope.show = function (request) {
      request.then(
        function (data) {
          $scope.data = data;
        })
    };


    Social.FB.updateLoginStatus()
      .then(function (res) {
        // res: FB.getLoginStatus response
        // https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus
        $scope.loginStatus = res;
      })
      .then(function () {
        Social.FB.loadMe();
      })
      .catch(function(err){
        alert(err);
      })
      .finally(function(huh){
        alert('finally '+huh);
      });

    $scope.FB = Social.FB;

    var SC = window.SC;// Social.SC;

    $scope.initSC = function () {
/*

      // this does not work - don't know why..
      SC.connectCallback = function (something) {
        console.log(SC.isConnected());
        return SC.get('/me?oauth_token=blabla');// <-- auth token appears in the URL of the popup while it's trying to close itself
      };
      // initiate auth popup
      SC.connect().then(function () {
        return SC.get('/me');
      })
        .then(function (me) {
        alert('Hello, ' + me.username);
      })
        .catch(function (error) {
          $log.error(error);
        });*/

    };

    $scope.SC = SC;


  });
