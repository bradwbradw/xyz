angular.module('xyzApp').directive('mediaItemDot', function ($document, $log, $sce, $timeout, Library, Utility, Spaces, Playlister) {

  return {
    restrict: 'A',
    templateUrl: 'xyzApp/media-item-dot.svg',
    templateNamespace: 'svg',
    scope: {
      item: '=',
      viewer: '=',
      space: '=',
      layoutConstants: '=',
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
          minX: scope.layoutConstants.SPACE_DIMENSIONS.minX + scope.layoutConstants.DOT_RADIUS,
          minY: scope.layoutConstants.SPACE_DIMENSIONS.minY +  scope.layoutConstants.DOT_RADIUS,
          maxX: scope.layoutConstants.SPACE_DIMENSIONS.width - scope.layoutConstants.DOT_RADIUS,
          maxY: scope.layoutConstants.SPACE_DIMENSIONS.height - scope.layoutConstants.DOT_RADIUS
        };

//        $log.log(boundaries);

//        Playlister.recompute();

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

      var dotImageXOffset = function(){
//        $log.log('dot radius is ',scope.layoutConstants.DOT_RADIUS);
        if (item.provider === 'youtube'){
          return -50;
        } else {
          return -20;
        }
      };
      var dotImageYOffset = function(){
        if (item.provider === 'youtube'){
          return -40;
        } else {
          return -20;
        }
      };

      var dotImageHeight = function(){
        if (item.provider === 'youtube'){
          return '150px';
        } else {
          return '100px';
        }
      };

      var dotImageWidth = function(){
        if (item.provider === 'youtube'){
          return '150px';
        } else {
          return '100px';
        }
      };

      scope.dotImageXOffset = dotImageXOffset;
      scope.dotImageYOffset = dotImageYOffset;
      scope.dotImageHeight = dotImageHeight;
      scope.dotImageWidth = dotImageWidth;

      scope.Utility = Utility;
    }
  };
});