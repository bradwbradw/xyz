'use strict';

angular.module('xyzApp')
    .controller('BodyCtrl', function ($rootScope, $window, $scope) {

        $rootScope.askConfirm = function(callback, thing, error){
            if($window.confirm){
                callback(thing).then(error);
            }
        }
    });

//askConfirm