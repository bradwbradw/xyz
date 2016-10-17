//noinspection JSUnresolvedVariable
angular.module('xyzApp')

  .service('Spaces', function ($log, $q, Space, User, Dj) {

    var spaceIncludeFields = ["owner", "songs", "contributors"];

    var uid = function () {
      return _.get(User.get(), 'id');
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
          if(uid()){
            userSpaces = Spaces.downloadUserSpaces();
          } else {
            userSpaces = $q.resolve([]);
          }

          return $q.all([Spaces.downloadAll(), userSpaces])
            .then(function(results){
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
      isOwnOrIsEditable: function (space) {
        return Spaces.isOwn(space) || Spaces.isEditable(space);
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
      getOwnOrEditable: function () {
        return _.filter(Spaces.map, Spaces.isOwnOrIsEditable)
      }
    };

    return Spaces;
  });