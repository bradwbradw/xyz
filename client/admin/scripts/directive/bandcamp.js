angular.module("songApp")
  .directive('bandcampAutoplay', function ($timeout) {


    return {
      restrict: 'A',
      scope:{

      },
      template:'',
      link: function(scope, element, attrs, $rootScope) {
        console.log('linking bandcamp directive');

        var clicky = function(){

          console.log('tryin to click');

        var playbutton = element[0].contentWindow.document.getElementById('big_play_button');

        angular.element(playbutton).after('play ');

        angular.element(playbutton).triggerHandler('click');

        };


        var timeoutPromise = $timeout(clicky, 3000);


      }
    };
  });