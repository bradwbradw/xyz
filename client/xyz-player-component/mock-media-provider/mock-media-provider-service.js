'use strict';

/**
 * @ngdoc service
 * @name xyzApp.MockMediaProvider
 * @description
 * # MockMediaProvider
 * Service in the xyzApp.
 */"use strict";

angular.module("xyzApp")
  .factory("MockMediaProvider", function ($q, $log, $window, $timeout, $interval) {

    // borrowed from http://plnkr.co/edit/8lxuN8?p=info

    var deferred = $q.defer();
    var apiReady = deferred.promise;

    var resolution = function () {
      deferred.resolve();
      $log.debug('mock media service is ready');
    };

    $log.debug('starting to load the mock media service');
    $timeout(resolution, 1000);


    var songDeferred = $q.defer();
    var songDone = songDeferred.promise;

    var backgroundCss;

    var play = function () {

      if (MockMediaProvider.status !== 'queued'){
        $log.error('play() called before song has been loaded!!!');
        return;
      };
      MockMediaProvider.status = 'playing';

      MockMediaProvider.songInterval =
        $interval( songDone.resolve, MockMediaProvider.currentSong.length*1000);

      // non important color changing viz:
      var colors = [
        [62, 35, 255],
        [60, 255, 60],
        [255, 35, 98],
        [45, 175, 230],
        [255, 0, 255],
        [255, 128, 0]
        ];
      var step = 0; var colorIndices = [0, 1, 2, 3];
      var gradientSpeed = 0.01;
      function updateGradient() {

        var c0_0 = colors[colorIndices[0]];
        var c0_1 = colors[colorIndices[1]];
        var c1_0 = colors[colorIndices[2]];
        var c1_1 = colors[colorIndices[3]];

        var istep = 1 - step;
        var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
        var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
        var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
        var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

        var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
        var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
        var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
        var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

        MockMediaProvider.backgroundCss ={
          'background-color': color2
        };


        step += gradientSpeed;
        if (step >= 1) {
          step %= 1;
          colorIndices[0] = colorIndices[1];
          colorIndices[2] = colorIndices[3];

          //pick two new target color indices
          //do not pick the same as the current one
          colorIndices[1] = ( colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
          colorIndices[3] = ( colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;

        }
      }
      MockMediaProvider.animation = $interval(updateGradient, 10);


    };

    var pause = function(){
      MockMediaProvider.status = 'paused';
      MockMediaProvider.animation.cancel();

    };

    var loadSong = function(provider_id){
      MockMediaProvider.status = 'loading';
      return $timeout(function(){

        MockMediaProvider.currentSong = {
          name:'mockMedia - '+provider_id,
          artist:'mockerson',
          length:provider_id*1,
        };

        MockMediaProvider.status = 'queued';

      },500);
    };

    var getPosition = function(){};

    var MockMediaProvider = {
      onReady: function (callback) {
        apiReady.then(callback);
      },
      onSongDone: function(callback) {
        songDone.then(callback);
      },

      play: play,
      pause: pause,
      loadSong: loadSong,
      currentSong:{},
      position:false,
      status:'initializing',
      animation:{},
      songInterval:{},
      getPosition: getPosition,
      backgroundCss: backgroundCss,
      getBackgroundCss:function(){
        return MockMediaProvider.backgroundCss;
      }
    };

    return MockMediaProvider;

  });