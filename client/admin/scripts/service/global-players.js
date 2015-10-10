
  angular.module('songApp')

    .service('Player', function ($http, $log, $q) {

      return {

        yt:{player:{}},
        sc:{player:{}},
        bc:{player:{}}
      }

    });