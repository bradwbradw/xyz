xyzApp.run(function ($rootScope, $state, $log) {


  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
//    event.preventDefault();
//    $state.get('error').error = { code: 123, description: 'Exception stack trace' };
    $log.error('error transitioning to ' + toState.name + ' from ' + fromState.name + ':', error);
//    return $state.go('error');
  });


});