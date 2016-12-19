"use strict";

var xyzApp = angular.module("xyzApp",
  ['ui.router',
    'ngSanitize',
    'ezfb',
    'LocalStorageModule',
    'ngResource',
    'ngAria',
    'ngAnimate',
    'ngMessages',
    'ngMaterial',
    'lbServices',
    'xyzPlayer',
    'ngToast'
  ]);


xyzApp.constant('layout_constants', {
  SPACE_DIMENSIONS: {
    minX: 0,
    minY: 0,
    width: 600,
    height: 600
  },
  SPACE_MARGIN: {
    LEFT: 16 * 3, // corresponds to $space-margin-left in scss variables
    TOP: 16 * 3
  },
  PROVIDER_THUMBNAIL_DIMENSIONS: {
    soundcloud: {
      h: 100,
      w: 100
    },
    youtube: {
      h: 360,
      w: 480
    },
    bandcamp: {
      h: 100, // default placeholder value, needs verification
      w: 100 // default placeholder value, needs verification
    }
  },
  DOT_RADIUS: 15
});

xyzApp.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('');
});

var debugIsEnabled = !!(window.localStorage && window.localStorage['d']);

xyzApp.config(function ($logProvider) {
  $logProvider.debugEnabled(debugIsEnabled);
});


xyzApp.config(['ngToastProvider', function (ngToastProvider) {
  ngToastProvider.configure({
    animation: 'slide',
    dismissOnTimeout: true
  });
}]);


xyzApp.filter('secondsToDateTime', [function () {
  return function (seconds) {
    return new Date(1970, 0, 1).setSeconds(_.round(seconds));
  };
}]);
