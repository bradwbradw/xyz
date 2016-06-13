xyzApp.run(function($rootScope, $state, $log){


  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    event.preventDefault();
    $state.get('error').error = { code: 123, description: 'Exception stack trace' }
    $log.error(error);
//    return $state.go('error');
  });


});