angular.module('xyzApp').directive('playlistPath', function ($interval, $log, Playlister) {

  return {
    restrict: 'A',
    templateUrl: 'xyzApp/playlist-path.svg',
    templateNamespace: 'svg',
    scope: {},
    link: function (scope) {

      var animationInterval = 300;

      var pointsInPlaylist = function () {
        return _.filter(Playlister.getList(), function (p) {
          return p.x && p.y;
        });
      };

      var generatePathDescription = function (numPointsToDraw) {

        var points = pointsInPlaylist();
        var pathParts = [];

        var addPoint = function (point) {
          pathParts.push(point.x + "," + point.y);
        };
        _.each(_.slice(points, 0, numPointsToDraw), addPoint);

        return "M" + pathParts.join(" L");
      };

      var numPathPointsThatWereTraversed;
      var lineBuildingVisual;

      var moveLinePath = function () {
        numPathPointsThatWereTraversed++;
        scope.pathDescription = generatePathDescription(numPathPointsThatWereTraversed);
        $log.log(numPathPointsThatWereTraversed, scope.pathDescription);
      };

      var start = function () {

        scope.pathDescription = '';
        numPathPointsThatWereTraversed = 0;
        lineBuildingVisual = $interval(
          moveLinePath,
          animationInterval,
          _.size(pointsInPlaylist()));
      };
      start();

      scope.$on('did_recompute_playlist', start);


    }
  };
});