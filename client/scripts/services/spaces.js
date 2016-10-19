//noinspection JSUnresolvedVariable
angular.module('xyzApp')

  .service('Spaces', function ($log, $q, $stateParams, Space, User, Dj, Utility) {

    $log.log('state params is ', $stateParams);
    var spaceIncludeFields = ["owner", "songs", "contributors"];

    var uid = function () {
      return _.get(User.get(), 'id');
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
      createItem: function(item){
        return Space.songs.create({id: id()}, item)
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
      current: function(){
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
      deleteForever: function(space){
        return api.deleteSpace(space)
          .then(function(){
            removeFromMap(space);
          })
          .catch(function(err){
            $log.error(err);
            Utility.showError("Sorry, couldn't delete the space. Please try again later");
          });
      },
      saveAndUpdateMap: function (apiFn, params, predictedUpdatedAttrs) {
        return api[apiFn].apply(this, params)
          .then(function () {
            extend(predictedUpdatedAttrs || _.first(params));
          })
          .catch(function (err) {
            $log.error(err);
            Utility.showError("sorry, there was an error while updating space. Please try again soon.")
          });
        // TODO
        // .then(checkAndHandle) makes a simple get request to space
        // and verifies that edits were correct
      },
      downloadAll: function () {
        return Space.find({filter: {include: spaceIncludeFields, where: {public: true}}})
          .$promise;
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
      }
    };

    return Spaces;
  });