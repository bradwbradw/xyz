"use strict";

angular.module('xyzApp', []);
angular.module('xyzAdmin',
  ['xyzApp',
    'ui.router',
    'ngSanitize',
    'LocalStorageModule',
    'ngResource',
    'ngAria',
    'ngAnimate',
    'ngMaterial',
    'lbServices',
    'ngToast'
  ]);

angular.module('xyzAdmin')
  .run(function ($rootScope, $state, $log) {


  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
//    event.preventDefault();
//    $state.get('error').error = { code: 123, description: 'Exception stack trace' };
    $log.error('error transitioning to ' + toState.name + ' from ' + fromState.name + ':', error);
//    return $state.go('error');
  });


});