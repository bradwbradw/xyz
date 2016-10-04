'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:AddMediaCtrl
 * @description
 * # AddMediaCtrl
 * 'hub'-like controller used for importing and saving. Connected to many services
 */
angular.module('xyzApp')
  .controller('AddMediaCtrl', function ($timeout, Extract, Library, Social, MediaAPI, Player, localStorageService, $scope, $log, $window, $q, SPACE_DIMENSIONS) {
    /*
     Library.currentSpace = $scope.$parent.space;*/

    $scope.space = Library.currentSpace;

    var newItem = '';

    var explore = function (serviceLoader) {

      serviceLoader
        .then(Extract.filterOutMusicUrls)
        .then(function (musicUrls) {
          var musicItemPromises = [];
          _.each(musicUrls, function (musicUrl) {
            musicItemPromises.push(Extract.getData(musicUrl));
          });

          return $q.all(musicItemPromises)
            .then(function (result) {
              return _.uniq(result, 'provider_id');
            })
            .catch(function (error) {
              console.error('download posts failed:', error);
            });
        })
        .then(Library.addToSearchResults)

        .catch(function (error) {
          console.error('import ctrl error ', error);
          alert(error.message ? error.message : 'there was an error without message prop');
        });

    };

    var updateImportView = function (new_) {
      $timeout(Library.addToSearchResults(new_));
      $scope.fetchingSongData = false;
    };

    var invalidLink = function () {
      $scope.error = 'This looks like an invalid link.';
      $scope.fetchingSongData = false;

    };


    var searchInputChanged = function (text) {
      if (!text) return;
      $scope.fetchingSongData = true;
      return Extract.inspectText(text, filters)
        .then(function (result) {
          $scope.urlResult = result;
          return result;
        })
        .then(updateImportView)
        .catch(invalidLink)
        .finally(function(){
          $scope.fetchingSongData = false;
        });

    };

    var putInSpace = function (item, event) {
      // if desktop
      item.x = _.round($window.outerWidth / 4); //should be 25% from left side of screen / window
      item.y = event.y < SPACE_DIMENSIONS.height? event.y : SPACE_DIMENSIONS.height - 20;
      Library.add(item);
    };


    Social.FB.refreshFB()
      .then(function () {
        Social.FB.loadMe();
      });

    var isSoundcloudArtist = function (searchResultItem) {
      return _.get(searchResultItem, 'provider') === 'soundcloud'
        && _.get(searchResultItem, 'kind') === 'user';
    };

    var isMedia = function (item) {
      return _.get(item, 'kind') === 'media';
    };


    var thereAreSearchResults = function () {
      return _.isArray(Library.getSearchResults()) &&
        _.size(Library.getSearchResults()) > 0;
    };

    $scope.FB = Social.FB;

    var filters = {
      "soundcloud": true,
      "youtube": true
    };

    var filterAllows = function(item){
      return filters[item.provider];
    };

    $scope.searchInputChanged = searchInputChanged;
    $scope.filterAllows = filterAllows;
    $scope.thereAreSearchResults = thereAreSearchResults;
//    $scope.downloadMorePosts = downloadMorePosts;
    $scope.filters = filters;
    $scope.isSoundcloudArtist = isSoundcloudArtist;
    $scope.isMedia = isMedia;
    $scope.urlResult = '';
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
