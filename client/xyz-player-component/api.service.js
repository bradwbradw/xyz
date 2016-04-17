
angular.module('xyzPlayer').service('Api', function ($http, serverConfig) {


  var API = serverConfig.apiBaseUrl;

  var get = function (item) {
//    resetErrors();
    return $http.get(API + item);
  };

  var getPlaylist = function (spaceId) {
    return get('api/spaces/playlist?spaceId=' + spaceId)
      .then(function (result) {
        return result.data.playlist;
      });
  }

  var Api = {
    getPlaylist: getPlaylist
  };

  console.log('see api ',Api);
  return Api;
});
