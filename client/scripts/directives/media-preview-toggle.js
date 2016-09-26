angular.module('xyzApp').
  directive('mediaPreviewToggle', function (Player, Library, $log) {

    return {
      restrict: 'A',
      scope:{
        mediaPreviewToggle:'='
      },
      templateUrl:'partials/media-preview-toggle-directive.html',
      link: function (scope, element, attr) {

        $log.debug('media preview toggle scope item is ', scope.mediaPreviewToggle.title);
        scope.item = scope.mediaPreviewToggle;
        scope.Player = Player;
        scope.Library = Library;

      }
    };
  });