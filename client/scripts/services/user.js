'use strict';

/**
 * @ngdoc service
 * @name xyzApp.User
 * @description
 * # User
 * Service in the xyzApp.
 */
angular.module('xyzApp')
  .service('User', function ($q, Server, localStorageService) {

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
      /*

       getToken: function () {
       return localStorageService.get('user');
       },
       */

      login: function (data) {
        return Server.login(data)
          .then(function (response) {
            return User.saveUserInfo(response.data);
          })
          .then(User.fetchAttrs)
          .catch(function () {
            return $q.reject('Sorry, please verify your email and password and try again.');
          });
      },

      logout: function () {
        return Server.logout(User.get().accessToken)
          .then(function () {
            localStorageService.remove('user');
            User.userData = false;
          });
      },

      userData: false,
      get: function () {
//        console.log('user.get(): ', User.userData);
        return User.userData;
      },
      attrs: function () {
        if (User.get() && User.get().attrs) {
          return User.get().attrs;
        } else {
          return false;
        }
      },
      spaces: function () {
        if (User.attrs() && User.attrs().spaces) {
          return User.attrs().spaces;
        } else {
          return false;
        }
      },
      addSpace: function(space){
        var newSpaces = [];
        if(User.spaces()){
          newSpaces = User.spaces();
        }
        newSpaces.push(_.clone(space));
        User.update({spaces:newSpaces})
          .then(function(){
            User.userData.attrs.spaces = newSpaces;
          });

      },
      fetchAttrs: function (idAndToken) {

        var userData = {
          userId: idAndToken.userId,
          accessToken: idAndToken.accessToken,
          created: idAndToken.created,
          attrs: {}, // email, id, name, list of spaces...
        };

        Server.getUser(idAndToken)
          .then(function (response) {
            console.log('get user response:', response);
            userData.attrs = response.data;
            User.userData = userData;
          });
      },
      loadUser: function () {
        var data = localStorageService.get('user');
        if (!data) return false;

        User.fetchAttrs(data);
      },

      register: function (data) {
        return Server.register(data)
          .then(function () {
            return $q.resolve(data); // so that can now log in
          })
      },

      update: function (data) {
        return Server.updateUser(User.get().userId, User.get().accessToken, data)
          .then(function (response) {
            if(response && response.data && response.data.id === User.get().userId){
              User.userData.attrs = response.data;
            }
            console.log('update response.data:', response.data);
          });
      }
    };

    return User;
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
