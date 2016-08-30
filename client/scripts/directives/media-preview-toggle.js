angular.module('xyzApp').
  directive('mediaPreviewToggle', function (Player, Library) {

    return {
      restrict: 'A',
      scope:{
        mediaPreviewToggle:'='
      },
      templateUrl:'views/partials/media-preview-toggle-directive.html',
      link: function (scope, element, attr) {

        console.log('scope item is ', scope.mediaPreviewToggle);
        scope.item = scope.mediaPreviewToggle;
        scope.Player = Player;
        scope.Library = Library;

      }
    };
  });