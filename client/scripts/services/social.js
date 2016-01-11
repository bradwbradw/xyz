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
  .config(function (ezfbProvider, apiKeys) {

    ezfbProvider.setInitParams({
      // Facebook App ID
      appId: apiKeys.fb_app_id,

      // Module default is `v2.4`.
      // If you want to use Facebook platform `v2.3`, you'll have to add the following parameter.
      // https://developers.facebook.com/docs/javascript/reference/FB.init
      version: 'v2.3'
    });
  });

angular.module('xyzApp')
  .service('Social', function ($window, $q, $timeout, ezfb) {
    // AngularJS will instantiate a singleton by calling "new" on this function

// initiate auth popup
//
    /*
     */
    var Social = {

      FB: {

        me: {},
        posts: {},
        friends: {},
        likes: {},
        profile: {},

        post_paging: false,

        login: function () {
          return ezfb.login(
            null,
            {scope: 'email,user_likes,user_friends,user_posts,public_profile'}
          );
        },

        loggedIn: function () {
          return !!Social.FB.me;
        },
        logout: ezfb.logout,

        updateLoginStatus: function () {
          return ezfb.getLoginStatus();
        },

        /*

         updateApiCall: $q.all([
         ezfb.api('/me'),
         ezfb.api('/me/likes')
         ]).then(function (data) {
         return data;
         }),*/

        loadMe: function () {
          return $timeout(ezfb.api('/me')
            .then(function (data) {
              Social.FB.me = data;
            }));
        },

        loadFriends: function () {
          ezfb.api('/me/friends')
            .then(function (data) {
              Social.FB.friends = data;
            })
        },

        loadPosts: function () {
          var endpoint = '/me/posts';
          if (Social.FB.post_paging) {
            endpoint = Social.FB.post_paging.next;
          }
          return ezfb.api(endpoint)
            .then(function (data) {
              Social.FB.post_paging = data.paging;
              Social.FB.posts = data;
              return Social.FB.posts;
            })
            .catch(function (error) {
              return $q.reject(error);
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
      SC: $window.SC,
      BC: {}
    };

    return Social;


  });
