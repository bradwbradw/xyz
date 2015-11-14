'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:SocialtestctrlCtrl
 * @description
 * # SocialtestctrlCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('SocialTestCtrl', function ($scope, Social, $window) {

    $scope.data = false;

    $scope.show = function(request){
     request.then(
       function(data){
         $scope.data = data;
       })
    };




    Social.FB.updateLoginStatus()
      .then(function (res) {
        // res: FB.getLoginStatus response
        // https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus
        $scope.loginStatus = res;
      })
      .then(function( ){
        Social.FB.loadMe();
      });

    $scope.FB = Social.FB;

    var SC = Social.SC;

   $scope.initSC = function(){

    SC.connect().then(function() {
      return SC.get('/me');
    }).then(function(me) {
      alert('Hello, ' + me.username);
    });
   };

    $scope.SC = SC;


  });
