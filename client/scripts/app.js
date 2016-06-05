"use strict";

var xyzApp = angular.module("xyzApp",
  ['ui.router',
    'ngSanitize',
    'ezfb',
    'LocalStorageModule',
//    'ngTouch',
    'ngResource',
    'ngAria',
    'ngAnimate',
    'ngMaterial',
    'lbServices',
    'ls.LiveSet',
    'ls.ChangeStream',
    'xyzPlayer'
  ]);

xyzApp.config(function ($httpProvider) {// jshint ignore:line
  /*
   $httpProvider.defaults.useXDomain = true;
   $httpProvider.defaults.withCredentials = true;
   delete $httpProvider.defaults.headers.common["X-Requested-With"];
   $httpProvider.defaults.headers.common["Accept"] = "application/json";
   $httpProvider.defaults.headers.common["Content-Type"] = "application/json";*/
});

xyzApp.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setStorageCookieDomain('');
});

var errorAlert = function (err) {

  var message;
  if (_.isObject(err)) {
    message = _.get(err, 'data.error.message', '') + '\n';
    message += 'status: ' + _.get(err, 'status', '') + '\n';
    message += _.get(err, 'config.url', '') + '\n';
    message += _.get(err, 'statusText', '') + '\n';
  } else {
    message = err;
  }


  console.error(message);
  alert(message);
};
