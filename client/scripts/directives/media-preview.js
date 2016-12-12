angular.module('xyzApp').
  directive('mediaPreview', function (Player, $sce, Library, Utility) {

    return {
      restrict: 'A',
      templateUrl:'xyzApp/media-preview.html',
      link: function (scope) {

        scope.iFrameUrl = Utility.iFrameUrl;

        scope.Player = Player;
        scope.Library = Library;

        scope.$sce = $sce;
      }
    };
  });