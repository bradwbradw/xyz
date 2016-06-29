'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:AddMediaCtrl
 * @description
 * # AddMediaCtrl
 * 'hub'-like controller used for importing and saving. Connected to many services
 */
angular.module('xyzApp')
  .controller('AddMediaCtrl', function ($timeout, Extract, Library, Social, MediaAPI, Player, localStorageService, $scope, $log, $window, $q) {
/*
    Library.currentSpace = $scope.$parent.space;*/

    $scope.space = Library.currentSpace;

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

    var explore = function (serviceLoader) {

      serviceLoader
        .then(Extract.filterOutMusicUrls)
        .then(function(musicUrls){
          var musicItemPromises = [];
          _.each(musicUrls, function(musicUrl){
            musicItemPromises.push(Extract.getData(musicUrl));
          });

          return $q.all(musicItemPromises)
            .then(function(result){
//              console.log('download posts result:',result);
              return _.unique(result, 'provider_id');
            })
            .catch(function(error){
              console.error('download posts failed:',error);
            });
        })
        .then(Library.addToLocalItems)

        .catch(function(error){
          console.error('import ctrl error ',error);
          alert(error.message? error.message : 'there was an error without message prop');
        });

    };

    var updateImportView = function (new_) {
      $timeout(Library.addToLocalItems(new_));
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

    var urlResult;


    $scope.examineText = function (text) {
      if (!text) return;
      $scope.fetchingSongData = true;
      console.log('new text is '+ text);
      return Extract.inspectText(text)
        .then(function(result){
          $scope.urlResult = result;
          return result;
        });

    };

    var putInSpace = function(item, event){
      // if desktop
      item.x = $window.width;
      item.y = event.y;
      Library.add(item);
    };


    Social.FB.refreshFB()
      .then(function () {
        Social.FB.loadMe();
      });

    var isSoundcloudArtist = function(searchResultItem){
      return _.get(searchResultItem,'provider') === 'soundcloud'
        && _.get(searchResultItem,'kind') === 'user';
    };

    var isMedia = function(item){
      return _.get(item, 'kind') === 'media';
    };
    $scope.FB = Social.FB;

//    $scope.downloadMorePosts = downloadMorePosts;
    $scope.isSoundcloudArtist = isSoundcloudArtist;
    $scope.isMedia = isMedia;
    $scope.urlResult = urlResult;
    $scope.updateImportView = updateImportView;
    $scope.invalidLink = invalidLink;

    $scope.putInSpace = putInSpace;
    $scope.explore = explore;

    $scope.newItem = newItem;

    $scope.Library = Library;
    $scope.Extract = Extract;
    $scope.Player = Player;
    $scope.Social = Social;
    $scope.MediaAPI = MediaAPI;
  });
