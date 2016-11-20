angular.module('xyzApp').directive('iconOfProvider', function () {
  return {
    restrict: 'A',
    scope: {
      iconOfProvider: '@'
    },
    templateUrl: 'partials/icon-of-provider.html',
    link: function (scope) {

      var imageSource = '/images/';
      if (scope.iconOfProvider === 'youtube') {
        imageSource += 'youtube-logo-light.png';
      } else if (scope.iconOfProvider === 'soundcloud') {
        imageSource += 'soundcloud-logo-light.png';
      } else if (scope.iconOfProvider === 'bandcamp') {
        imageSource += 'bandcamp-logo-light.png';
      }

      scope.imageSource = imageSource;

    }
  };
});