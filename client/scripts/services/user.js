'use strict';

/**
 * @ngdoc service
 * @name xyzApp.User
 * @description
 * # User
 * Service in the xyzApp.
 */
angular.module('xyzApp')
  .service('User', function ($q, $state, $log, Server, Dj, Utility) {

    var User = {
      data: {},
      get: function () {
        if (_.size(User.data) > 0) {
          return User.data;
        } else {
          return false;
        }
      },
      set: function (newUserData) {
        User.data = newUserData;
        return User.data;
      },
      fetch: function () {
        if (_.size(User.data) > 0) {
          return $q.resolve(User.get())
        } else {
          return User.download();
        }
      },
      download: function () {
        return Dj.getCurrent()
          .$promise
          .then(User.set)
          .catch(function(err){
            if(err.status == 401){
              var noUser = {};
              return $q.resolve(User.set(noUser));
            } else {
              $log.error('error fetching user ', err);
            }
          });
      },
      update: function (data) {
        return Dj.prototype$updateAttributes({id: User.get().id}, data)
          .$promise
          .then(User.set)
          .then(function(){
            Utility.showMessage("update successful");
          })
          .catch(Utility.showError);
      },

      spaces: {
        own: [],
        editable: []
      },
      getSpaces: function () {
        return User.spaces;
      },
      setSpaces: function (spaces) {
        User.spaces = spaces;
        return User.spaces;
      },
      fetchSpaces: function () {
        if (User.get() && !User.hasOwnSpaces() && !User.hasEditableSpaces()) {
          return User.downloadSpaces();
        } else {
          return $q.resolve(User.getSpaces());
        }
      },
      downloadSpaces: function () {
        return $q.all([
          Dj.spaces({id: User.get().id}).$promise,
          Dj.editableSpaces({id: User.get().id}).$promise
        ])
          .then(function (results) {
            var editable = results[1];
            _.each(editable, function (space) {
              space.userIsContributor = true;
            });
            return {
              own: results[0],
              editable: editable
            }
          })
          .then(User.setSpaces)
          .catch(function (err) {
            return $q.reject(err);
          })
      },
      hasOwnSpaces: function () {
        return _.size(User.spaces.own) > 0;
      },
      hasEditableSpaces: function () {
        return _.size(User.spaces.editable) > 0;
      },

      appendSpace: function (space) {
        if (_.isArray(User.spaces.own)) {
          User.spaces.own.push(space);
        } else {
          _.set(User.spaces, {
            own: [space],
            editable: []
          });
        }

        return space;
      },


      addSpace: function (space) {

        return Dj.spaces.create({id: User.get().id}, space)
          .$promise
//          .then(User.appendSpace)
          .catch(function (err) {
            return $q.reject(err);
          });

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

    };

    return User;
// AngularJS will instantiate a singleton by calling "new" on this function
  })
;
