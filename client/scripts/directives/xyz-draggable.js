angular.module('xyzApp').directive('xyzDraggable', function ($document, $log, Library, Playlister) {
  return {
    scope: {
      xyzDraggable: '<',
      canDrag: '=',
      space:'='
    },
    link: function (scope, element, attr) {
      var item = scope.xyzDraggable;

      scope.getX = function (item) {

        $log.log('get x directive ', item.x);
        return item.x;
      };

      scope.getY = function () {
        return item.y;
      };

      var canDrag = scope.canDrag;

      if (_.isUndefined(item)) {
        return;
      }

      var startX;
      var startY;
      var x = parseFloat(item.x) || 0;
      var y = parseFloat(item.y) || 0;
      /*

       element.css({
       top: y + 'px',
       left: x + 'px'
       });

       */
/*
      attr.cx = x;
      attr.cy = y;

      */
      element.attr('cx',x);
      element.attr('cy',y);
      if (!canDrag) {
        return;
      }

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
        $log.log('dragMove event:', event);
        x = event.pageX - dragPointOffsetX;
        y = event.pageY - dragPointOffsetY;

        /*

         element.css({
         left: x + 'px',
         top: y + 'px'
         });
         */

      element.attr('cx',x);
      element.attr('cy',y);

        item.x = x;
        item.y = y;
        $log.log('item x is now ', item.x);

//        scope.$apply();
//        Playlister.recompute(scope.space);
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
          // assume that a drag was performed
          $log.debug('set just dropped to true for item ', item);
          item.justDropped = true;
//        event.stopPropagation();
          // item was actually dragged
          Library.update(item.id, item);

        } else {
          // assume there was no drag performed (long press)
          $log.debug('set just dropped to false for item ', item);

          item.justDropped = false;
        }


      }
    }
  };
});