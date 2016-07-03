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
  .config(function (ezfbProvider, apiKeys, serverConfig) {

    if (serverConfig.developing) {
      return;
    } else {


    ezfbProvider.setInitParams({
      // Facebook App ID
      appId: apiKeys.fb_app_id,

      // Module default is `v2.4`.
      // If you want to use Facebook platform `v2.3`, you'll have to add the following parameter.
      // https://developers.facebook.com/docs/javascript/reference/FB.init
      version: 'v2.3'
    });
  }
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

        // this one is used
        status: false,
        connecting: false,
        isConnected: function () {
          return Social.FB.status === 'connected';
        },
        isConnecting: function () {
          return Social.FB.connecting;
        },
        setConnecting: function () {
          Social.FB.connecting = true;
          return $q.resolve(true);
        },

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

        refreshFB: function () {

//          console.log('refreshing fb');

          $timeout(function(){
            Social.FB.connecting = false;
            return $q.reject('Facebook seems unreachable');
          },7500);
          return Social.FB.setConnecting()
            .then(Social.FB.updateLoginStatus)
            .then(function (res) {
//              console.log('updated login:', res);
              // res: FB.getLoginStatus response
              // https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus
            })
            .then(function () {
//              console.log('trying to load me');
              Social.FB.loadMe;
            })
            .catch(function (err) {
              console.error('error loading me:  '+err);
              alert(err);
            })
            .finally(function () {
//              console.log('finally done refreshing FB');
              Social.FB.connecting = false;
            });
        },
        updateLoginStatus: function () {

          return ezfb.getLoginStatus()
            .then(function (response) {

              Social.FB.status = response.status;
              return status
            })
            .catch(function (err) {
              return $q.reject(err);
            });

        },


        loadMe: function () {
          return $timeout(ezfb.api('/me')
            .then(function (data) {
              Social.FB.me = data;
            })
            .catch(function(err){
              return $q.reject(err);
            })
          );
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
      SC: {},
      BC: {}
    };

    return Social;


  });
