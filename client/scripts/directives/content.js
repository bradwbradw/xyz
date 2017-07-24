/**
 * Created by brad on 7/4/16.
 */
xyzApp
  .directive('content', ['Content', function (Content) {
    return {
      restrict: 'A',
      scope:{
        content:'@' 
      }, 
      link: function (scope, element) {
        scope.html = Content.get(scope.content)
      
      
      }
    };
}]);
