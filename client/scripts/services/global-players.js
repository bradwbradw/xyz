"use strict";

  angular.module('xyzApp')

    .service('Player', function ($http, $log, $q) { //jshint ignore:line

      return {

        yt:{player:{}},
        sc:{player:{}},
        bc:{player:{}}
      };

    });