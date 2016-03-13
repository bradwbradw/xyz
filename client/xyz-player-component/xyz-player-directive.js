"use strict";

angular.module("xyzApp")
    .directive('xyzPlayer', function ($log, MockMediaProvider, youTubeApiService) {

        return {
            restrict: "A",

            scope: {},

            templateUrl: 'xyz-player-component/xyz-player.html',

            link: function (scope, element, attrs, $rootScope) { //jshint ignore:line

              MockMediaProvider.onReady(function(){
                $log.debug('xyzPlayer sees MockMediaProvider')
              });

/*              youTubeApiService.onReady(function(){
                $log.debug('xyzPlayer sees youTubeApiService')
              })*/
            }
        }
    });