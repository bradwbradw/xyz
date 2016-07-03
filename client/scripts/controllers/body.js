'use strict';

angular.module('xyzApp')
    .controller('BodyCtrl', function ($rootScope, $window, $scope, Utility) {

        $rootScope.askConfirm = function(callback, thing, error){
            if($window.confirm){
                callback(thing).then(error);
            }
        };

      $rootScope.showError = function(thing){
        $rootScope.error = Utility.cleanError(thing);
      }
    });

//askConfirm