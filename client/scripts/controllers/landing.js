'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:LandingCtrl
 * @description
 * # LandingCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('LandingCtrl', function ($rootScope, $scope, $q,Dj, User, Server, Space,allSpaces) {

    $scope.Dj = Dj;//.findById({id:'5684f858d4b1e4996ec6d9bf'});

    $scope.User = User;

    $scope.allSpaces = allSpaces;

/*

    var registerData = {};

    $scope.registerData = registerData;

    $scope.handleRegister = function(){
      return Dj.login(registerData, _.noop)
        .$promise
        .catch(function(err){
          return $q.reject(err);
        });
      console.log('register handled:');
    };
*/

    $scope.showError = function(error){
      $rootScope.error = error;
    };

    $rootScope.lb = Server.loopback;


    $scope.deleteSpace = function(space){
      //return Dj.spaces.destroyById({id:User.get().id,fk:space.id}, _.noop)
      return Space.destroyById({id:space.id}, _.noop)
        .$promise
        .then(User.fetchSpaces)
        .catch(function(err){
          return $q.reject(err);
        });
    }


  });
