'use strict';

/**
 * @ngdoc service
 * @name xyzApp.Social
 * @description
 * # Social
 * Service in the xyzApp.
 */

//https://github.com/pc035860/angular-easyfb

angular.module('xyzApp')
  .config(function (ezfbProvider) {

    ezfbProvider.setInitParams({
      // This is my FB app id for plunker demo app
      appId: '1381485208848570',

      // Module default is `v2.4`.
      // If you want to use Facebook platform `v2.3`, you'll have to add the following parameter.
      // https://developers.facebook.com/docs/javascript/reference/FB.init
      version: 'v2.5'
    });
  });

angular.module('xyzApp')
  .service('Social', function ($window, ezfb) {
    // AngularJS will instantiate a singleton by calling "new" on this function


    var Social = {

      FB: {

        me: {},
        posts: {},
        friends: {},
        likes: {},
        profile: {},

        login: function () {
          return ezfb.login(
            null,
            {scope: 'email,user_likes,user_friends,user_posts,public_profile'}
          );
        },

        logout: ezfb.logout,

        updateLoginStatus: ezfb.getLoginStatus,

        /*

         updateApiCall: $q.all([
         ezfb.api('/me'),
         ezfb.api('/me/likes')
         ]).then(function (data) {
         return data;
         }),*/

        loadMe: function () {
          return ezfb.api('/me')
            .then(function(data){
              Social.FB.me = data;
            });
        },

        loadFriends: function () {
          ezfb.api('/me/friends')
            .then(function (data) {
              Social.FB.friends = data;
            })
        },

        loadPosts: function () {
          ezfb.api('/me/posts')
            .then(function (data) {
              Social.FB.posts = data;
            })
        },
        loadLikes: function () {
          ezfb.api('/me/likes')
            .then(function (data) {
              Social.FB.likes = data;
            })
        },
        loadProfile: function () {
          ezfb.api('/me/public_profile')
            .then(function (data) {
              Social.FB.profile = data;
            })
        }
      },
      YT: {},
      SC: {},
      BC: {}
    };

    return Social;


  });
