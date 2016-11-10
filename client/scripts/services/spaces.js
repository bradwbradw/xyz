//noinspection JSUnresolvedVariable
angular.module('xyzApp')

  .service('Spaces', function ($log, $q, $stateParams, Space, User, Dj, Utility) {

//    $log.log('state params is ', $stateParams);
    var spaceIncludeFields = ["owner", "songs", "contributors"];

    var uid = function () {
      return _.get(User.get(), 'id');
    };

    var errMessages = {
      11000: "That one is already in the space"
    };
    var populateError = function (response) {
      var code = _.get(response, 'data.error.code');
      var msg = _.get(errMessages, code);
      if (msg) {
        _.set(response, 'data.error.niceMessage', msg);
      }
      return response;
    };

    var id = function () {
      return _.get($stateParams, 'id');
    };

    var api = {
      update: function (updatedSpace) {
        return Space.prototype$updateAttributes({id: id()}, updatedSpace)
          .$promise
      },
      removeFromContributors: function (user) {
        return Space.contributors.unlink({id: id(), fk: user.id})
          .$promise
      },
      addToContributors: function (user) {
        return Space.contributors.link({id: id(), fk: user.id}, null)
          .$promise
      },
      deleteSpace: function (space) {
        return Space.destroyById({id: space.id})
          .$promise
      },
      createItem: function (item) {
        return Space.songs.create({id: id()}, item)
          .$promise
          .catch(function (response) {
            return $q.reject(populateError(response));
          })
      },
      updateItem: function (item) {
        return Space.songs.updateById({id: id(), fk: _.get(item, 'id')}, item)
          .$promise
      },
      removeItem: function (item) {
        return Space.songs.destroyById({id: id(), fk: item.id})
          .$promise
      }
    };

    var extend = function (updatedAttrs) {
      _.extend(Spaces.map[id()], updatedAttrs);
      return Spaces.map[id()];
    };

    var removeFromMap = function (space) {
      _.unset(Spaces.map, space.id);
    };

    var Spaces = {
      map: {},
      getMap: function () {
        return Spaces.map;
      },
      get: function () {
        if (_.size(Spaces.map) > 0) {
          return $q.resolve(Spaces.getMap());
        } else {

          var userSpaces;
          if (uid()) {
            userSpaces = Spaces.downloadUserSpaces();
          } else {
            userSpaces = $q.resolve([]);
          }

          return $q.all([Spaces.downloadAll(), userSpaces])
            .then(function (results) {
              return _.flatten(results);
            })
            .then(Spaces.makeMap)
            .then(Spaces.set);
        }
      },
      getById: function (id) {
        var found = _.get(Spaces.map, id);
        if (found) {
          return $q.resolve(found);
        } else {
          return Spaces.downloadOne(id)
            .then(Spaces.addToMap);
        }
      },
      current: function () {
        return _.get(Spaces.map, id());
      },
      set: function (data) {
        Spaces.map = data;
        return data;
      },
      makeMap: function (list) {
        var uniqueList = _.uniqBy(list, 'id');
        return _.keyBy(uniqueList, 'id');
      },
      addToMap: function (newOne) {
        _.set(Spaces.map, newOne.id, newOne);
        return newOne;
      },
      deleteForever: function (space) {
        return api.deleteSpace(space)
          .then(function () {
            removeFromMap(space);
          })
          .catch(function (err) {
            $log.error(err);
            Utility.showError("Sorry, couldn't delete the space. Please try again later");
          });
      },

      /**
       * @ngdoc method
       * @name saveAndUpdateMap
       * @methodOf Spaces
       *
       * @description
       *
       * Call this to both send data to server and update map object
       * so that local UI is up to date.  map will only update if API request
       * succeeds.
       *
       * @param {String=} apiFn
       * name of function to call ( see api object above )
       *
       * @param {Array=} params
       * the list of arguments to pass to apiFn
       *
       * @param {Object=} predictedUpdatedAttrs
       *  An Object that contains key:value pairs that correspond to
       *  the new values of the space's properties after the request succeeds.
       *  The space will be modified using the lodash _.extend(predictedUpdateAttrs).
       *  The space will only be modified if the Api request succeeds.
       *
       * @returns {Promise}
       * Resolves after the api and map updating operations finish, or rejects if
       * there was an api error.
       * It is discouraged to use the value that this returns.
       * Instead keep your templates bound to the value coming from the map (Spaces.currentSpace())
       *
       */
      saveAndUpdateMap: function (apiFn, params, predictedUpdatedAttrs) {
        return api[apiFn].apply(this, params)
          .then(function () {
            extend(predictedUpdatedAttrs || _.first(params));
          })
          .catch(function (err) {
            $log.error(err);
            var defaultMessage = "sorry, there was an error while updating space. Please try again soon.";
            var message = _.get(err, 'data.error.niceMessage', defaultMessage);

            Utility.showError(message);
          });
        // TODO
        // .then(checkAndHandle) makes a simple get request to space
        // and verifies that edits were correct
      },
      downloadAll: function () {
        var request = function () {
          return Space.find({ filter: { include: spaceIncludeFields, where: {public: true}}}).$promise;
        };
        return request
          .catch(function(){
            $log.warn('a request to spaces failed, trying again...');
            return request();
          });
        // ^ try again because sometimes the request fails with 500
        // https://github.com/bradwbradw/xyz/issues/165
      },
      downloadOne: function (id) {
        return Space.findOne({filter: {include: spaceIncludeFields, where: {id: id}}})
          .$promise;
      },
      downloadUserSpaces: function () {
        if (!uid()) {
          return $q.reject('user is not logged in');
        } else {
          return $q.all([
            Dj.spaces({id: uid(), filter: {include: spaceIncludeFields}}).$promise,
            Dj.editableSpaces({id: uid(), filter: {include: spaceIncludeFields}}).$promise
          ])
            .then(_.flatten);
        }
      },
      isPublic: function (space) {
        return _.get(space, 'public', false);
      },
      isOwn: function (space) {
        return User.get() && _.get(space, 'owner.id') === User.get().id;
      },
      isEditable: function (space) {
        return User.get() && _.find(_.get(space, 'contributors'), {id: User.get().id});
      },
      getPublic: function () {
        return _.filter(Spaces.map, Spaces.isPublic);
      },
      getOwn: function () {
        return _.filter(Spaces.map, Spaces.isOwn);
      },
      getEditable: function () {
        return _.filter(Spaces.map, Spaces.isEditable);
      },
      setFirstSong: function (song) {
        var newFirst = {
          firstSong: _.get(song, 'id'),
          pic: _.get(song, 'pic')
        };
        return Spaces.saveAndUpdateMap('update', [newFirst], newFirst)
      }
    };

    return Spaces;
  });