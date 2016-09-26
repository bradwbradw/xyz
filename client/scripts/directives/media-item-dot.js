angular.module('xyzApp').directive('mediaItemDot', function ($document, $log, $sce, Library, Utility, Playlister) {

  return {
    restrict: 'A',
    templateUrl: 'partials/item-dot.svg',
    templateNamespace: 'svg',
    scope: {
      item: '=',
      space: '=',
      viewer: '=',
      dotRadius: '=',
      isFirstSong: '&',
      doneDragging: '&'
    },
    link: function (scope, element, attr) {

      var item = scope.item;

      scope.getX = function (item) {

        $log.log('get x directive ', item.x);
        return item.x;
      };

      scope.getY = function () {
        return item.y;
      };


      if (_.isUndefined(item)) {
        return;
      }

      var startX;
      var startY;
      var x = parseFloat(item.x) || 0;
      var y = parseFloat(item.y) || 0;

      element.find('circle').attr('cx', x);
      element.find('circle').attr('cy', y);

      var dragPointOffsetX;
      var dragPointOffsetY;


      var dragStart = function (event) {
        $log.log('dragStart event:%s,%s', event.screenX, event.screenY);
        $log.log('dragStart event:', event);


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
        item.dragging = true;
//      $log.log('dragMove event:', event);
        x = event.pageX - dragPointOffsetX;
        y = event.pageY - dragPointOffsetY;


        element.find('circle').attr('cx', x);
        element.find('circle').attr('cy', y);

        item.x = x;
        item.y = y;

      }

      function dragDone(event) {
        item.dragging = false;
        $log.log('dragDone event:', event);
        /*
         $document.off('touchmove', dragMove);
         $document.off('touchend', dragDone);*/
        $document.off('mousemove', dragMove);
        $document.off('mouseup', dragDone);

        $log.log('startX ' + startX + ' startY ' + startY);
        $log.log('new X ' + item.x + ' new Y ' + item.y);

        if (item.x !== startX
          || item.y !== startY) {
          scope.doneDragging(item);

        } else {
          // assume there was no drag performed (long press)
          $log.debug('set just dropped to false for item ', item);

          item.justDropped = false;
        }


      }

      scope.Utility = Utility;
    }
  };
});