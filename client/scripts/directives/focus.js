xyzApp.directive('focus', function($rootScope, $log, $timeout) {
  return {
    restrict: 'AC',
    link: function(_scope, _element) {

      var focus = function(){
        $log.log('focussing ',_element[0]);
        _element[0].focus();
      };

      $rootScope.$on('open-search', function(){
        $timeout(focus, 200)
      });
    }
  };
});