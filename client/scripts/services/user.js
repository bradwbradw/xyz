'use strict';

/**
 * @ngdoc service
 * @name xyzApp.User
 * @description
 * # User
 * Service in the xyzApp.
 */
angular.module('xyzApp')
  .service('User', function ($q, Server, Dj, Space) {

    var User = {

      userData: false,

      get: function () {
        return User.userData;
      },
      set: function(newUserData){
        User.userData = newUserData;
        return User.userData;
      },

      loggedIn: Dj.isAuthenticated,

      register: function (data) {
        return Server.loopback.Dj.create(data)
          .then(function () {
            return $q.resolve(data); // return user and pass so that can now log in right after registering
          })
          .catch(function (err) {
            return $q.reject(err);
          })
      },

      login: function (data) {
        return Server.loopback.Dj.login(data)
          .then(function(response){
            User.set(response.user);
          })
          .catch(function (err) {
            var message;
            if(err && err.data){
              message = err.data;
            }
            return $q.reject(message);
          });
      },

      logout: function () {
        return Dj.logout(_.noop).$promise;
      },
      update: function (data) {
        return Dj.prototype$updateAttributes({id:User.get().id},data, _.noop)
          .$promise
          .then(User.set);
      },

      fetchUserInfo: function () {

        return Dj.getCurrent(_.noop)
          .$promise
          .then(User.set);
      },
      spaces: false,
      getSpaces: function(){
        return User.spaces;
      },
      setSpaces: function(spaces){
        User.spaces = spaces;
        return User.spaces;
      },
      fetchSpaces: function(){
        return Dj.spaces({id:User.get().id}).$promise
          .then(User.setSpaces)
          .catch(function(err){
            return $q.reject(err);
          })
      },
      addSpace: function (space) {
//        space.ownerId = User.get().id;
        Dj.spaces.create({id:User.get().id},space,_.noop)
          .$promise
          .then(User.fetchSpaces)
          .catch(function(err){
            return $q.reject(err);
          });


        /*
        var newSpaces = [];
        if (User.spaces()) {
          newSpaces = User.spaces();
        }
        newSpaces.push(_.clone(space));
        User.update({spaces: newSpaces})
          .then(function () {
            User.userData.get.spaces = newSpaces;
          });
*/
      }
    };

    return User;
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
