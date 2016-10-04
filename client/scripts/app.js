"use strict";

var xyzApp = angular.module("xyzApp",
  ['ui.router',
    'ngSanitize',
    'ezfb',
    'LocalStorageModule',
    'ngResource',
    'ngAria',
    'ngAnimate',
    'ngMaterial',
    'lbServices',
    'ls.LiveSet',
    'ls.ChangeStream',
    'xyzPlayer',
    'dibari.angular-ellipsis',
    'ngToast'
  ]);


xyzApp.constant('SPACE_DIMENSIONS', {
  minX: 0,
  minY: 0,
  width: 600,
  height: 600
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
