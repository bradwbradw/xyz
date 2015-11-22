angular.module('xyzApp').
directive('draggable', function($document, $log) {
  return function(scope, element, attr) {
    var song = scope.$parent.song;

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
      $document.on('touchmove', dragMove);
      $document.on('touchend', dragDone);
      $document.on('mousemove', dragMove);
      $document.on('mouseup', dragDone);
    };

    element.on('touchstart', dragStart);
    element.on('mousedown', dragStart);

    function dragMove(event) {
      $log.log('dragMove event:',event);
      x = event.pageX - dragPointOffsetX;
      y = event.pageY - dragPointOffsetY;
      element.css({
        left:  x + 'px',
        top: y + 'px'
      });
    }

    function dragDone(event) {
      $log.log('dragDone event:',event);
      $document.off('touchmove', dragMove);
      $document.off('touchend', dragDone);
      $document.off('mousemove', dragMove);
      $document.off('mouseup', dragDone);
    }
  };
});