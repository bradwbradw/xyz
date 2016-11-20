/**
 * Created by brad on 7/4/16.
 */
angular.module('xyzApp')
  .directive('debug', ['$rootScope', function ($rootScope) {
    return {
      restrict: 'E',
      scope:{
        obj:'=',
        name:'=',
        maxHeight:'='
      },
      template:'<pre ng-if="debugging" class="debug" ng-style="{\'max-height\':maxHeight}">{{name}}: {{obj | json}}</pre>',
      link: function (scope) {
        scope.debugging = $rootScope.debug;
      }
    };
}]);