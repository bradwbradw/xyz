'use strict';

/**
 * @ngdoc service
 * @name xyzApp.User
 * @description
 * # User
 * Service in the xyzApp.
 */
angular.module('xyzApp')
  .service('User', function ($q, Server, Dj, localStorageService) {

    var User = {

      saveUserInfo: function (userData) {
        var userInfo =
        {
          userId: userData.userId,
          accessToken: userData.id,
          created: userData.created
        };
        if (localStorageService.set('user', userInfo)) {
          return userInfo;
        }
      },

      userData: false,
      loggedIn: Dj.isAuthenticated,
      get: function () {
        return User.userData;
      },
      attrs: function () {
        if ( User.get() ) {
          return User.get();
        } else {
          return false;
        }
      },

      fetchUserInfo: function () {

        return Dj.getCurrent(_.noop)
          .$promise
          .then(function (attrs) {
            console.log('get user response:', attrs);
            User.userData = attrs;
            return attrs;
          });
      },
      spaces: function () {
        if (User.attrs() && User.attrs().spaces) {
          return User.attrs().spaces;
        } else {
          return false;
        }
      },
      addSpace: function (space) {
        var newSpaces = [];
        if (User.spaces()) {
          newSpaces = User.spaces();
        }
        newSpaces.push(_.clone(space));
        User.update({spaces: newSpaces})
          .then(function () {
            User.userData.attrs.spaces = newSpaces;
          });

      },

      register: function (data) {
        return Server.loopback.Dj.create(data)
          .then(function () {
            return $q.resolve(data); // return user, pass so that can now log in
          })
          .catch(function (err) {
            return $q.reject(err);
          })
      },

      login: function (data) {
        return Server.loopback.Dj.login(data)
          .then(function(response){
            User.userData = response.user;
          })
          .catch(function () {
            return $q.reject('Sorry, please verify your email and password and try again.');
          });
      },

      logout: function () {
        return Dj.logout(_.noop).$promise;
      },
      update: function (data) {
        return Server.updateUser(User.get().userId, User.get().accessToken, data)
          .then(function (response) {
            if (response && response.data && response.data.id === User.get().userId) {
              User.userData.attrs = response.data;
            }
            console.log('update response.data:', response.data);
          });
      }
    };

    return User;
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
