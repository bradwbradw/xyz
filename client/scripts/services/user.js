'use strict';

/**
 * @ngdoc service
 * @name xyzApp.User
 * @description
 * # User
 * Service in the xyzApp.
 */
angular.module('xyzApp')
  .service('User', function ($q, $state, $log, Server, Dj) {

    var User = {

      userData: false,

      get: function () {
        return User.userData;
      },
      set: function (newUserData) {
        User.userData = newUserData;
        return User.userData;
      },
      loggedIn: function () {
        // shouldn't have to do this
        // https://github.com/strongloop/loopback/issues/1081
        if (!window.localStorage.getItem('$LoopBack$currentUserId')) {
          return false;
        }
        return Dj.isAuthenticated();
      },
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
          .then(function (response) {
            User.set(response.user);
          })
          .catch(function (err) {
            var message;
            if (err && err.data) {
              message = err.data;
            }
            return $q.reject(message);
          });
      },

      logout: function () {
        return Dj.logout().$promise
          .then(function () {
            User.set(false);
            User.setSpaces(false);
            $state.go($state.current, {}, {reload: true});
          })
          .catch(function () {
            $log.error('token expired, cannot call logout because of annoying loopback bug');
            User.set(false);
            User.setSpaces(false);

            // shouldn't have to do this
            // https://github.com/strongloop/loopback/issues/1081
            window.localStorage.removeItem('$LoopBack$accessTokenId');
            window.localStorage.removeItem('$LoopBack$currentUserId');
            $state.go('base.landing', {}, {reload: true});
          });
      },

      update: function (data) {
        return Dj.prototype$updateAttributes({id: User.get().id}, data, _.noop)
          .$promise
          .then(User.set);
      },

      fetchUserInfo: function () {
        return Dj.getCurrent(_.noop)
          .$promise
          .then(User.set)
          .then(User.fetchSpaces)
          .catch(function (err) {
            return $q.reject(err);
          });
      },
      spaces: {
        own: [],
        editable: []
      },
      hasOwnSpaces: function () {
        return _.size(User.spaces.own) > 0;
      },
      hasEditableSpaces: function () {
        return _.size(User.spaces.editable) > 0;
      },

      getSpaces: function () {
        return User.spaces;
      },

      setSpaces: function (spaces) {
        User.spaces = spaces;
        return User.spaces;
      },
      appendSpace: function (space) {
        User.spaces.own.push(space);
      },

      fetchSpaces: function () {
        return $q.all([
            Dj.spaces({id: User.get().id}).$promise,
            Dj.editableSpaces({id: User.get().id}).$promise
          ])
          .then(function (results) {
            return {
              own: results[0],
              editable: results[1]
            }
          })
          .then(User.setSpaces)
          .catch(function (err) {
            return $q.reject(err);
          })
      },

      addSpace: function (space) {
//        space.ownerId = User.get().id;
        Dj.spaces.create({id: User.get().id}, space, _.noop)
          .$promise
          .then(User.appendSpace)
          .catch(function (err) {
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
  })
;
