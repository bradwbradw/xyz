'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:PreviewCtrl
 * @description
 * # PreviewCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('PreviewCtrl', function ($scope, Player, $sce) {
    var iFrameUrl = function (item) {

      var url;
      if (item.provider === 'youtube') {
        url = 'https://www.youtube.com/embed/'
        + Player.playingAttrs().provider_id
        + '?autoplay=';

        if (Player.status.autoplay) {
          url += '1';
        } else {
          url += '0';
        }
        url += '&start=' + Player.status.startFrom;

      } else if (item.provider === 'soundcloud') {

        url = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/'
        + item.provider_id
        + '&amp;auto_play='
        + Player.autoplay
        + '&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true';

      } else if (item.provider === 'bandcamp') {

        url = 'http://bandcamp.com/EmbeddedPlayer/size=medium/bgcol=ffffff/linkcol=0687f5/tracklist=false/track='
        +item.provider_id
        +'/transparent=true/';
      } else {
        url = '/iframeUrlProblem';
      }

      return $sce.trustAsResourceUrl(url);
    };

    $scope.iFrameUrl = iFrameUrl;

    $scope.Player = Player;


    $scope.$sce = $sce;
  });
