angular.module('xyzApp').
  directive('xyzDraggable', function ($document, $log, Library) {
    return function (scope, element, attr) {
      var item = scope.$parent.item;

      var canDrag = attr.xyzDraggable === 'owner';

      if (_.isUndefined(item)) {
        return;
      }

      var startX;
      var startY;
      var x = parseFloat(item.attrs.x) || 0;
      var y = parseFloat(item.attrs.y) || 0;

      element.css({
        top: y + 'px',
        left: x + 'px'
      });


      if(!canDrag){
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

        $document.on('touchmove', dragMove);
        $document.on('touchend', dragDone);
        $document.on('mousemove', dragMove);
        $document.on('mouseup', dragDone);
      };

      element.on('touchstart', dragStart);
      element.on('mousedown', dragStart);

      function dragMove(event) {
        item.dragging = true;
//      $log.log('dragMove event:',event);
        x = event.pageX - dragPointOffsetX;
        y = event.pageY - dragPointOffsetY;
        element.css({
          left: x + 'px',
          top: y + 'px'
        });
        item.attrs.x = x;
        item.attrs.y = y;
      }

      function dragDone(event) {
        item.dragging = false;
//      $log.log('dragDone event:',event);

        $document.off('touchmove', dragMove);
        $document.off('touchend', dragDone);
        $document.off('mousemove', dragMove);
        $document.off('mouseup', dragDone);

        $log.log('startX ' + startX + ' startY ' + startY);
        $log.log('new X ' + item.attrs.x + ' new Y ' + item.attrs.y);

//        item.expanded = false;

        if (item.attrs.x !== startX
          || item.attrs.y !== startY) {
          item.justDropped = true;
          // item was actually dragged
          Library.update(item.id, item.attrs);
        } else {

          item.justDropped = false;
        }
      }
    };
  });