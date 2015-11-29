angular.module('xyzApp').
directive('xyzDraggable', function($document, $log, Library) {
  return function(scope, element, attr) {
    var song = scope.$parent.song;

    var startX;
    var startY;
    var x = parseFloat(song.attrs.x) || 0;
    var y = parseFloat(song.attrs.y)  || 0;

    element.css({
      top: y+'px',
      left: x+'px'
    });

    var dragPointOffsetX;
    var dragPointOffsetY;

    var dragStart = function(event) {
      $log.log('dragStart event:%s,%s',event.screenX, event.screenY);
      $log.log('dragStart event:',event);

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
      song.dragging = true;
//      $log.log('dragMove event:',event);
      x = event.pageX - dragPointOffsetX;
      y = event.pageY - dragPointOffsetY;
      element.css({
        left:  x + 'px',
        top: y + 'px'
      });
      song.attrs.x = x;
      song.attrs.y = y;
    }

    function dragDone(event) {
      song.dragging = false;
//      $log.log('dragDone event:',event);

      $document.off('touchmove', dragMove);
      $document.off('touchend', dragDone);
      $document.off('mousemove', dragMove);
      $document.off('mouseup', dragDone);

      $log.log('startX '+startX + ' startY '+startY);
      $log.log('new X '+song.attrs.x + ' new Y '+song.attrs.y);

//        song.expanded = false;

      if(song.attrs.x !== startX
      || song.attrs.y !== startY ){
        // song was actually dragged
        Library.update(song.id, song.attrs);
      }
    }
  };
});