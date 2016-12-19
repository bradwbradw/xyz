angular.module('xyzApp').directive('mediaItemDot', function ($document, $log, $sce, $timeout, Library, Utility, layout_constants) {

  return {
    restrict: 'A',
    templateUrl: 'xyzApp/media-item-dot.svg',
    templateNamespace: 'svg',
    scope: {
      item: '=',
      viewer: '=',
      space: '=',
      isNowPlaying: '&',
      showFirstSongStyle: '&',
      doneDragging: '&',
      draggingFirst: '&'
    },
    link: function (scope, element) {

      var item = scope.item;

      if (_.isUndefined(item)) {
        return;
      }
      var circleElement = element.find('circle');

      var halo = element.find('.now-playing-halo');

      var startX;
      var startY;
      var x = parseFloat(item.x) || 0;
      var y = parseFloat(item.y) || 0;

      circleElement.attr('cx', x);
      circleElement.attr('cy', y);
      halo.attr('cx', x);
      halo.attr('cy', y);

      var dragPointOffsetX;
      var dragPointOffsetY;


      var dragStart = function (event) {
//        $log.log('dragStart event:%s,%s', event.screenX, event.screenY);
//        $log.log('dragStart event:', event);

        // Prevent default dragging of selected content
        event.preventDefault();

        dragPointOffsetX = event.pageX - x;
        dragPointOffsetY = event.pageY - y;

        startX = x;
        startY = y;
        /*

         $document.on('touchmove', dragMove);
         $document.on('touchend', dragDone);*/

        $document.on('mousemove', dragMove);
        $document.on('mouseup', dragDone);

      };

//    element.on('touchstart', dragStart);
      element.on('mousedown', dragStart);

      function dragMove(event) {
//        $log.log('dragMove event:', event);
        x = event.pageX - dragPointOffsetX;
        y = event.pageY - dragPointOffsetY;

        var boundaries = {
          minX: layout_constants.SPACE_DIMENSIONS.minX + layout_constants.DOT_RADIUS,
          minY: layout_constants.SPACE_DIMENSIONS.minY + layout_constants.DOT_RADIUS,
          maxX: layout_constants.SPACE_DIMENSIONS.width - layout_constants.DOT_RADIUS,
          maxY: layout_constants.SPACE_DIMENSIONS.height - layout_constants.DOT_RADIUS
        };

//        $log.log(boundaries);

//        Playlister.recompute();
        // ^ if uncommenting add Playlister back to dependencies!

        if (x < boundaries.minX) {
          x = boundaries.minX;
        }
        if (y < boundaries.minY) {
          y = boundaries.minY;
        }

        if (x > boundaries.maxX) {
          x = boundaries.maxX;
        }
        if (y > boundaries.maxY) {
          y = boundaries.maxY;
        }

        circleElement.attr('cx', x);
        circleElement.attr('cy', y);

        item.x = x;
        item.y = y;

      }

      function dragDone() {
        item.dragging = false;

//        $log.log('dragDone event:', event);
        /*
         $document.off('touchmove', dragMove);
         $document.off('touchend', dragDone);*/
        $document.off('mousemove', dragMove);
        $document.off('mouseup', dragDone);

//        $log.log('startX ' + startX + ' startY ' + startY);
        //       $log.log('new X ' + item.x + ' new Y ' + item.y);

        if (item.x !== startX
          || item.y !== startY) {
          scope.doneDragging(item);

        } else {
          // assume there was no drag performed (long press)
//          $log.debug('set just dropped to false for item ', item);

          item.justDropped = false;
        }


      }

      var dotRadius = function(){
        return layout_constants.DOT_RADIUS;
      };

      var getDimensions = function(item){
        return _.get(layout_constants, 'PROVIDER_THUMBNAIL_DIMENSIONS.' + item.provider);
      };

      var dotImageXOffset = function () {
        return dotImageWidth() / -3;
      };
      var dotImageYOffset = function () {
        return layout_constants.DOT_RADIUS * -1;
      };

      var dotImageHeight = function () {
        return layout_constants.DOT_RADIUS * 4;
      };

      var dotImageWidth = function () {
        var dimensions = getDimensions(item);
        var aspectRatio = dimensions.w / dimensions.h;
        return dotImageHeight() * aspectRatio;
      };

      scope.dotImageXOffset = dotImageXOffset;
      scope.dotImageYOffset = dotImageYOffset;
      scope.dotImageHeight = dotImageHeight;
      scope.dotImageWidth = dotImageWidth;

      scope.dotRadius = dotRadius;

      scope.Utility = Utility;
    }
  };
});