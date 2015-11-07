'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:ImportCtrl
 * @description
 * # ImportCtrl
 * 'hub'-like controller used for importing and saving. Connected to many services
 */
angular.module('xyzApp')
  .controller('ImportCtrl', function (Extract, Library, Social, localStorageService, $scope) {

    var addToLocalItems = function (newItems) {
      Library.localItems.push(newItems);
      localStorageService.set('localItems', Library.localItems);
    };

    var replaceLocalItems = function (newItems) {
      Library.localItems = newItems;
      localStorageService.set('localItems', Library.localItems);
    };

    var downloadMorePosts = function (replace) {

      if(replace){

      Social.FB.loadPosts()
        .then(Extract.filterOutMusicUrls)
        .then(replaceLocalItems);

      } else {

      Social.FB.loadPosts()
        .then(Extract.filterOutMusicUrls)
        .then(addToLocalItems);
      }
    };



    $scope.downloadMorePosts = downloadMorePosts;

  });
