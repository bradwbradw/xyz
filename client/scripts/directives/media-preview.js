angular.module('xyzApp').
  directive('mediaPreview', function (Player, $sce, Utility) {

    return {
      restrict: 'A',
      templateUrl:'views/partials/media-preview-directive.html',
      link: function (scope, element, attr) {

        scope.iFrameUrl = Utility.iFrameUrl;

        scope.Player = Player;

        scope.$sce = $sce;
      }
    };
  });