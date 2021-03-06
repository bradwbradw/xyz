angular.module('xyzApp').directive('mediaInspector', function ($window, $log, $timeout, $q, Player, MediaAPI, Utility, Library, Spaces, layout_constants, Playlister) {

  return {
    restrict: 'A',
    scope: {
      item: '='
    },
    templateUrl: 'xyzApp/media-inspector.html',
    link: function (scope) {

      var isSoundcloudArtist = function (searchResultItem) {
        return _.get(searchResultItem, 'provider') === 'soundcloud'
          && _.get(searchResultItem, 'kind') === 'user';
      };

      var isInCurrentSpace = function (item) {
        if (!item.provider_id) {
          return false;
        }
        var found = _.find(_.get(Spaces.current(), 'songs'), function (i) {
          /*
           $log.debug('i', i);
           $log.debug('comparing to ', item);
           */
          var provider = _.get(i, 'provider');
          var pid = _.get(i, 'provider_id');
          return provider === item.provider && pid === item.provider_id;
        });

        return found;
      };

      var isMedia = function (item) {
        return _.get(item, 'kind') === 'media';
      };

      var showAddButton = function (item) {
        return !item.error && isMedia(item) && !isInCurrentSpace(item)
      };

      var updateParentImportView = function (new_) {
        $timeout(Library.addToSearchResults(new_));
      };

      var putInSpace = function (item, event) {

        var coords = Utility.keepCoordsInBoundaries({
          x: event.x - layout_constants.SPACE_MARGIN.LEFT - 2*layout_constants.DOT_RADIUS,
          y: event.y - layout_constants.SPACE_MARGIN.TOP - 2*layout_constants.DOT_RADIUS
        });

        item.x = coords.x;
        item.y = coords.y;
        item.animations = ['enterGrow'];

        var currentItems = _.get(Spaces.current(), 'songs');

        var checkForIsFirstSong = function () {
          var items = _.get(Spaces.current(), 'songs');
          if (_.size(items) === 1) {
            return Spaces.setFirstSong(_.first(items))
          } else {
            return $q.resolve();
          }
        };

        Spaces.saveAndUpdateMap('createItem', [item], {
          songs: _.concat(currentItems, item)
        })
          .then(checkForIsFirstSong)
          .then(Playlister.recompute);
      };

      scope.showAddButton = showAddButton;
      scope.isInCurrentSpace = isInCurrentSpace;
      scope.putInSpace = putInSpace;
      scope.updateParentImportView = updateParentImportView;
      scope.isSoundCloudArtist = isSoundcloudArtist;
      scope.isMedia = isMedia;
      scope.Player = Player;
      scope.Library = Library;
      scope.MediaAPI = MediaAPI;
    }
  };
});
