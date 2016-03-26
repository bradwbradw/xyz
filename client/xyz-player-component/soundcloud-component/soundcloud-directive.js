"use strict";

angular.module("xyzApp")
  .directive('soundcloud', function ($log, $window /*, soundCloudApiService*/) {



    return {

      restrict: "A",

      scope: {
        soundid:"@",
        startSeconds:"@"
      },
      template: '<iframe></iframe>',

      link: function(scope, element, attrs, $rootScope){ //jshint ignore:line


        console.log('linking soundcloud directive');

/*
        var tag = document.createElement('script');
        tag.src = "";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
*/


//        var widget = $window.SC.Widget(element.children()[0]);

      }
    }
  });
