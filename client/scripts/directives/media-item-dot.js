angular.module('xyzApp').directive('mediaItemDot', function ($document, $log, $sce, $timeout, Animations, Library, Utility, layout_constants) {

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
      var clearAnimation = function(name){
        return function(){
          _.remove(item.animations, function(n){
            return n === name;
          });
        }
      };

      _.each(item.animations, function (name) {
        var animationFn = _.get(Animations, name);
        if (_.isFunction(animationFn)) {
          var Animation = animationFn(element[0]);
          Animation
            .onfinish = clearAnimation(name);
        }
      });

      var circleElement = element.find('circle');

      var halo = element.find('.now-playing-halo');

      var startX;
      var startY;
      item.x = parseFloat(item.x) || 0;
      item.y = parseFloat(item.y) || 0;

      circleElement.attr('cx', item.x);
      circleElement.attr('cy', item.y);
      halo.attr('cx', item.x);
      halo.attr('cy', item.y);

      var dragPointOffsetX;
      var dragPointOffsetY;


      var dragStart = function (event) {

        // Prevent default dragging of selected content
        event.preventDefault();

        dragPointOffsetX = event.pageX - item.x;
        dragPointOffsetY = event.pageY - item.y;

        startX = item.x;
        startY = item.y;
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

        var newCoords = {
          x: event.pageX - dragPointOffsetX,
          y: event.pageY - dragPointOffsetY
        };
        $log.debug('new coords', newCoords);

        var goodCoords = Utility.keepCoordsInBoundaries(newCoords);

        $log.debug('good coords', goodCoords);

        circleElement.attr('cx', goodCoords.x);
        circleElement.attr('cy', goodCoords.y);

        item.x = goodCoords.x;
        item.y = goodCoords.y;

//        Playlister.recompute();
        // ^ if uncommenting add Playlister back to dependencies!

      }

      function dragDone() {
        item.dragging = false;

//        $log.log('dragDone event:', event);
        /*
         $document.off('touchmove', dragMove);
         $document.off('touchend', dragDone);*/
        $document.off('mousemove', dragMove);
        $document.off('mouseup', dragDone);

        if (item.x !== startX
          || item.y !== startY) {
          scope.doneDragging(item);

        } else {
          // assume there was no drag performed (long press)
//          $log.debug('set just dropped to false for item ', item);

          item.justDropped = false;
        }


      }

      var dotRadius = function () {
        return layout_constants.DOT_RADIUS;
      };

      var getDimensions = function (item) {
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