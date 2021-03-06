
angular.module('xyzPlayer').service('Api', function ($http, serverConfig) {


  var API = serverConfig.apiBaseUrl;

  var get = function (item) {
//    resetErrors();
    return $http.get(API + item);
  };

  var getPlaylist = function (spaceId) {
    return get('spaces/playlist?spaceId=' + spaceId)
      .then(function (result) {
        return result.data.playlist;
      });
  };

  var Api = {
    getPlaylist: getPlaylist
  };

  return Api;
});
