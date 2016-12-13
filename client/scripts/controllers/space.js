'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:SpaceCtrl
 * @description
 * # SpaceCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('SpaceCtrl', function ($rootScope, $timeout, $scope, $log, $state, $window, $q, Server, Library, Player, Playlister, Spaces, Utility, owner, viewer, contributors, layout_constants) {

      var expanded, hovering;

      var setHovering = function (item) {
        hovering = item.id;
      };

      var unsetHovering = function () {
        hovering = null;
      };

      var isHovering = function(){
        return hovering;
      };

      var getHovering = function () {
        if(!hovering){
          return false;
        }
        var item = _.find(_.get(Spaces.current(), 'songs'), {id: hovering});
        if (!item || isExpanded(item)) {
          return false;
        }

        var topOffset = item.y +
          layout_constants.SPACE_MARGIN.TOP +
            1.25*16 +
          // FROM _variables.scc: $top-padding:1.25em;
            + 0.5*layout_constants.DOT_RADIUS +
          'px';

        var leftOffset = item.x +
          layout_constants.SPACE_MARGIN.LEFT +
          layout_constants.DOT_RADIUS +
          'px';

        var css = {
          top: topOffset,
          left: leftOffset
        };

//        $log.log('hovering is ', item);
        return {
          item: item,
          css: css
        };
      };


      var computeViewBox = function () {
        return _.values(layout_constants.SPACE_DIMENSIONS).join(" ");
      };

      _.each(_.get(Spaces.current(),'songs'), function(song){
        var index = _.findIndex(Spaces.current().songs, {id: song.id});
        _.set(Spaces.current().songs, index, Utility.fixItemPosition(song));
      });

      Playlister.recompute();

      var expand = function (song) {
        $timeout(function () {
          expanded = song.id;
        });
      };

      var handleDotClick = function (item, event) {

        if (item.justDropped) {
          // do nothing
          item.justDropped = false;
        } else {
          if (isExpanded(item)) {
            // also do nothing
          } else {
            closeExpanded();
            expand(item);
          }
        }

        if (event.stopPropagation) event.stopPropagation();
        if (event.preventDefault) event.preventDefault();
        event.cancelBubble = true;
        event.returnValue = false;
      };

      var closeExpanded = function (source) {

        $log.log('closing expanded ', source);
        expanded = null;
        Player.stop();
      };

      var isExpanded = function (song) {
        return expanded === song.id;
      };

      var isNowPlaying = function (song) {
        var nowPlayingId = _.get(Playlister.getNowPlaying(), 'id');
        return nowPlayingId && ( song.id === nowPlayingId );
      };

      var isFirstSong = function (song) {
        var firstSongId = _.get(Spaces.current(), 'firstSong');
        return firstSongId && ( song.id === firstSongId );
      };

      var setFirstSongThenRecompute = function (item) {
        Spaces.setFirstSong(item)
          .then(function () {
            Playlister.recompute(Spaces.current(),item.id);
          })
      };

      var openSidebar = function () {
        $rootScope.$emit('open-search');
      };

      var removeSong = function (item) {

        if ($window.confirm('remove this song? ' + item.title)) {
          Spaces.saveAndUpdateMap('removeItem', [item], {
            songs: _.reject(_.get(Spaces.current(), 'songs'), {id: _.get(item, 'id')})
          })
            .then(function () {
              closeExpanded('removed a song');
              Playlister.recompute();
            });
        }

      };

      var expandedItem = function () {
        if (!expanded || !_.get(Spaces.current(), 'songs')) {
          return false;
        } else {
//          $log.debug('expanded item is ', _.find(_.get(Spaces.current(), 'songs'), {id: expanded}).title);
          return _.find(_.get(Spaces.current(), 'songs'), {id: expanded});
        }
      };

      var songExpandedPopupCss = function () {
        var item = expandedItem();

        var topOffset = item.y +
          layout_constants.SPACE_MARGIN.LEFT +
          layout_constants.DOT_RADIUS +
          'px';

        var leftOffset = item.x +
          layout_constants.SPACE_MARGIN.TOP +
          layout_constants.DOT_RADIUS +
          'px';

        return {
          position: 'absolute',
          top: topOffset,
          left: leftOffset
        };
      };

      var onDragDone = function (item) {
        $log.debug('done draggging!', item);

        item.justDropped = true;

        if (canEdit()) {
          var updatedItems = _.get(Spaces.current(), 'songs');
          updatedItems[_.findIndex(updatedItems, {id: item.id})] = item;

          Spaces.saveAndUpdateMap('updateItem', [item], {
            songs: updatedItems
          });
        }

        if (!_.get(item, 'didPlay')){
          Playlister.recompute();
        }

      };

      var canEdit = function () {
        return viewer === 'owner' || viewer === 'contributor';
      };

      $scope.isHovering = isHovering;
      $scope.getHovering = getHovering;
      $scope.setHovering = setHovering;
      $scope.unsetHovering = unsetHovering;
      $scope.canEdit = canEdit;
      $scope.onDragDone = onDragDone;
      $scope.handleDotClick = handleDotClick;
      $scope.isNowPlaying = isNowPlaying;
      $scope.isFirstSong = isFirstSong;
      $scope.setFirstSongThenRecompute = setFirstSongThenRecompute;
      $scope.removeSong = removeSong;
      $scope.Player = Player;
      $scope.isExpanded = isExpanded;
      $scope.expandedItem = expandedItem;
      $scope.expand = expand;
      $scope.Library = Library;
      $scope.closeExpanded = closeExpanded;
      $scope.openSidebar = openSidebar;
      $scope.contributors = contributors;

      $scope.Spaces = Spaces;
      $scope.owner = owner;
      $scope.viewer = viewer;

      $scope.currentSpace = Spaces.current();

      $scope.computeViewBox = computeViewBox;

      $scope.layout_constants = layout_constants;


      $scope.songExpandedPopupCss = songExpandedPopupCss;

    }
  );
