'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:ImportCtrl
 * @description
 * # ImportCtrl
 * 'hub'-like controller used for importing and saving. Connected to many services
 */
angular.module('xyzApp')
  .controller('ImportCtrl', function ($timeout, Extract, Library, Social, localStorageService, $scope, $log, $q) {


    var newItem = '';

    var addToLocalItems = function (newItems) {
      Library.localItems = Library.localItems.concat(newItems);
    };
/*

    var downloadMorePosts = function () {

      Social.FB.loadPosts()
        .then(Extract.filterOutMusicUrls)
        .then(Library.addToLocalItems);
    };
*/

    var reDownloadPosts = function () {

      Social.FB.loadPosts()
        .then(Extract.filterOutMusicUrls)
        .then(function(musicUrls){
          var musicItemPromises = [];
          _.each(musicUrls, function(musicUrl){
            musicItemPromises.push(Extract.getData(musicUrl));
          });

          return $q.all(musicItemPromises)
            .then(function(result){
              console.log('download posts result:',result);
              return result;
            })
            .catch(function(error){
              console.error('download posts failed:',error);
            });
        })
        .then(Library.addToLocalItems);

    };

    var updateImportView = function (new_) {
      Library.addToLocalItems(new_);
      $scope.fetchingSongData = false;

    };

    var updateArrayOfNewItems = function(arr){
      $scope.newItems = arr;
      $scope.fetchingSongData = false;
    };

    var invalidLink = function () {
      $scope.error = 'This looks like an invalid link.';
      $scope.fetchingSongData = false;

    };

    $scope.examineText = function (text) {
      if (!text) return;
      $scope.fetchingSongData = true;
      Extract.inspectText(text)
        .then(updateImportView, invalidLink)

    };

//    $scope.downloadMorePosts = downloadMorePosts;
    $scope.reDownloadPosts = reDownloadPosts;

    $scope.newItem = newItem;

    $scope.Library = Library;
    $scope.Extract = Extract;
  });
