// test syntax:
//      http://jasmine.github.io/2.0/introduction.html

var request = require("supertest"),
  _ = require('lodash'),
  when = require('when');

var constants = require('../../../constants');

var fixtures = {
  users: require('../fixtures/users.js'),
  songs: require('../fixtures/songs.js')
};


var apiUrl = 'http://' + (constants.api.host || 'localhost') + ':' + constants.api.port + constants.api.path + '/';

var contributorDjName = fixtures.users.contributor.name;
var loginEndpoint = 'djs/login?include=user';
var publicSpaces;

var ownSpaces;
var firstSpace;
var spaceSongs;

var djs;
var contributorDj;

var authorization;
var randomAuth; // logged in but not owner or contributor
var contributorAuth;

var song;
var song2;

var newSpaceName = _.random(4,9999)+'th wave rock';

var loginAs = function (credentials) {
  return request(apiUrl)
    .post(loginEndpoint)
    .send(credentials)
    .then(function (response) {
      console.log('\n token for '+credentials.email+' is '+ _.get(response.body, 'id'));
      return response.body;
    })
    .catch(function (err) {
      return when.reject(err);
    })
};

describe(' space access (permissions) tests ', function () {

  it('should login', function (done) {

    loginAs(fixtures.users.owner.credentials)
      .then(function (auth) {

        authorization = auth;
//        console.log('auth:', authorization);
        expect(authorization.id).toBeDefined();
        expect(authorization.userId).toBeDefined();
      })
      .catch(function (msg) {
        console.error('url was ' + apiUrl + loginEndpoint);
        console.error('error looks like ' + msg.message);
        done(msg)
      })
      .finally(done);
  });


  it('should load the owner\'s own spaces', function (done) {

    var endpoint = 'djs/' + authorization.userId + '/spaces/';

    request(apiUrl)
      .get(endpoint)
      .set('Authorization', authorization.id)
      .expect(200)
      .then(function (response) {
//        console.log('response:', response.body);
        ownSpaces = response.body;
        firstSpace = _.first(ownSpaces);
        expect(_.size(ownSpaces)).toBeGreaterThan(0);
        expect(ownSpaces[0].ownerId).toEqual(authorization.userId);

      })
      .catch(function (msg) {
        console.error('url was ' + apiUrl + endpoint);
        done(msg)
      })
      .finally(done);

  });

  it('should load the public spaces', function (done) {


    var endpoint = 'spaces/';

    request(apiUrl)
      .get(endpoint)
      .expect(200)
      .then(function (response) {
//        console.log('response:', response.body);
        publicSpaces = response.body;
        expect(_.size(publicSpaces)).toBeGreaterThan(0);
      })
      .catch(function (msg) {
        console.error('url was ' + apiUrl + endpoint);
        done(msg)
      })
      .finally(done);

  });

  it('should load one owned space', function (done) {

    var endpoint = 'spaces/' + firstSpace.id;

    request(apiUrl)
      .get(endpoint)
      .expect(200)
      .then(function (response) {
//        console.log('response:', response.body);

        expect(_.size(response.body)).toBeGreaterThan(0);
      })
      .catch(function (msg) {
        console.error('url was ' + apiUrl + endpoint);
        done(msg)
      })
      .finally(done);

  });
  it('should load songs of one owned space', function (done) {

    var endpoint = 'spaces/' + firstSpace.id + '/songs';

    request(apiUrl)
      .get(endpoint)
      .expect(200)
      .then(function (response) {
//        console.log('response:', response.body);
        spaceSongs = response.body;
        expect(_.size(spaceSongs)).toBeGreaterThan(0);
      })
      .catch(function (msg) {
        console.error('url was ' + apiUrl + endpoint);
        done(msg)
      })
      .finally(done);

  });

  it('should load list of all djs', function (done) {

    var endpoint = 'djs';

    request(apiUrl)
      .get(endpoint)
      .set('Authorization', authorization.id)
      .expect(200)
      .then(function (response) {
//        console.log('response:', response.body);
        djs = response.body;
        contributorDj = _.find(djs, {name: contributorDjName});

        expect(contributorDj).toBeDefined('expecting a contributor Dj named "'+contributorDjName+'", but was not found');
        expect(_.size(djs)).toBeGreaterThan(0);
      })
      .catch(function (msg) {
        console.error('url was ' + apiUrl + endpoint);
        done(msg)
      })
      .finally(done);

  });

  it('should be able to add a contributor to owned space', function (done) {

//    console.log('contributor is ', contributorDj);

    var endpoint1 = 'spaces/' + firstSpace.id + '/contributors/rel/' + contributorDj.id;

    request(apiUrl)
      .put(endpoint1)
      .set('Authorization', authorization.id)
      .expect(200)
      .then(function () {

        var endpoint2 = 'spaces/' + firstSpace.id + '/contributors';

        return request(apiUrl)
          .get(endpoint2)
          .expect(200)
          .then(function (response) {

            var actualContributors = response.body;

            var foundContributor = _.find(actualContributors, {name: contributorDjName});
            expect(foundContributor.id).toBe(contributorDj.id);
          })

      })
      .catch(function (msg) {
        console.error('url was ' + apiUrl + endpoint);
        done(msg);
      })
      .finally(done);
  });


  it('random person should not be able to add a song to a space', function (done) {

    loginAs(fixtures.users.random.credentials)
      .then(function (auth) {
        randomAuth = auth;

        var endpoint = 'spaces/' + firstSpace.id + '/songs';
        request(apiUrl)
          .post(endpoint)
          .set('Authorization', randomAuth.id)
          .send(fixtures.songs.youtube)
          .expect(401)
          .catch(function (msg) {
            console.error('url was ' + apiUrl + endpoint);

            done(msg);
          })
          .finally(done);


      });
  });


  it('contributor should be able to add a song to a space', function (done) {

    loginAs(fixtures.users.contributor.credentials)
      .then(function (auth) {
        contributorAuth = auth;

        var endpoint = 'spaces/' + firstSpace.id + '/songs';
        request(apiUrl)
          .post(endpoint)
          .set('Authorization', contributorAuth.id)
          .send(fixtures.songs.youtube)
          .expect(200)
          .then(function(response){
            song = response.body;
          })
          .catch(function (msg) {
            console.error('url was ' + apiUrl + endpoint);

            done(msg);
          })
          .finally(done);


      });
  });

  it('owner should be able to add a song to a space', function (done) {

        var endpoint = 'spaces/' + firstSpace.id + '/songs';
        request(apiUrl)
          .post(endpoint)
          .set('Authorization', authorization.id)
          .send(fixtures.songs.youtube2)
          .expect(200)
          .then(function(response){
            song2 = response.body;
          })
          .catch(function (msg) {
            console.error('url was ' + apiUrl + endpoint);

            done(msg);
          })
          .finally(done);
  });



  it('owner should be able to change first song of a space', function (done) {

    var endpoint = 'spaces/' + firstSpace.id;

    var data = {
      "firstSong":song.id
    };
    request(apiUrl)
      .put(endpoint)
      .set('Authorization', authorization.id)
      .send(data)
      .expect(200)
      .catch(function (msg) {
        console.error('url was ' + apiUrl + endpoint);

        done(msg);
      })
      .finally(done);

  });

  it('random person should not be able to change first song of a space', function (done) {

    var endpoint = 'spaces/' + firstSpace.id;

    var data = {
      "firstSong":song.id
    };
    request(apiUrl)
      .put(endpoint)
      .set('Authorization', randomAuth.id)
      .send(data)
      .expect(401)
      .catch(function (msg) {
        console.error('url was ' + apiUrl + endpoint);

        done(msg);
      })
      .finally(done);

  });

  it('random person should not be able to delete a song from a space', function (done) {

    var endpoint = 'spaces/' + firstSpace.id + '/songs/'+song.id;
    request(apiUrl)
      .del(endpoint)
      .set('Authorization', randomAuth.id)
      .send(fixtures.songs.youtube)
      .expect(401)
      .catch(function (msg) {
        console.error('url was ' + apiUrl + endpoint);

        done(msg);
      })
      .finally(done);

  });

  it('owner should be able to delete a song from a space', function (done) {

    var endpoint = 'spaces/' + firstSpace.id + '/songs/'+song.id;
    request(apiUrl)
      .del(endpoint)
      .set('Authorization', authorization.id)
      .send(fixtures.songs.youtube)
      .expect(204)
      .catch(function (msg) {
        console.error('url was ' + apiUrl + endpoint);

        done(msg);
      })
      .finally(done);

  });

  it('contributor should be able to delete a song from a space', function (done) {

    var endpoint = 'spaces/' + firstSpace.id + '/songs/'+song2.id;
    request(apiUrl)
      .del(endpoint)
      .set('Authorization', contributorAuth.id)
      .send(fixtures.songs.youtube)
      .expect(204)
      .catch(function (msg) {
        console.error('url was ' + apiUrl + endpoint);

        done(msg);
      })
      .finally(done);

  });




  it('owner should be able change name of a space', function (done) {

        var endpoint = 'spaces/' + firstSpace.id;

        var data = {
          name:newSpaceName
        };

        request(apiUrl)
          .put(endpoint)
          .set('Authorization', authorization.id)
          .send(data)
          .expect(200)
          .then(function(response){
            song = response.body;

            request(apiUrl)
              .get(endpoint)
              .expect(200)
              .then(function(response){
                var space = response.body;
                expect(space.name).toBe(data.name);
              })
          })
          .catch(function (msg) {
            console.error('url was ' + apiUrl + endpoint);

            done(msg);
          })
          .finally(done);
  });

  // undecided if they should or shouldn't ? TODO: verify current behavior
  xit('contributor should be able change name of a space', function (done) {

        var endpoint = 'spaces/' + firstSpace.id;

        var data = {
          name:newSpaceName+'contrib'
        };

        request(apiUrl)
          .put(endpoint)
          .set('Authorization', contributorAuth.id)
          .send(data)
          .expect(200)
          .then(function(response){
            song = response.body;

            request(apiUrl)
              .get(endpoint)
              .expect(200)
              .then(function(response){
                var space = response.body;
                expect(space.name).toBe(data.name);
              })
          })
          .catch(function (msg) {
            console.error('url was ' + apiUrl + endpoint);

            done(msg);
          })
          .finally(done);
  });

  it('random person should not be able change name of a space', function (done) {

        var endpoint = 'spaces/' + firstSpace.id;

        var data = {
          name:'hot dog genre'
        };

        request(apiUrl)
          .put(endpoint)
          .set('Authorization', randomAuth.id)
          .send(data)
          .expect(401)
          .then(function(response){
            song = response.body;

            request(apiUrl)
              .get(endpoint)
              .expect(200)
              .then(function(response){
                var space = response.body;
                expect(space.name).not.toBe(data.name);
              })
          })
          .catch(function (msg) {
            console.error('url was ' + apiUrl + endpoint);

            done(msg);
          })
          .finally(done);
  });

  it('should be able to remove a contributor from owned space', function (done) {

    var endpoint1 = 'spaces/' + firstSpace.id + '/contributors/rel/' + contributorDj.id;

    request(apiUrl)
      .del(endpoint1)
      .set('Authorization', authorization.id)
      .expect(204)
      .then(function () {

        var endpoint2 = 'spaces/' + firstSpace.id + '/contributors';

        return request(apiUrl)
          .get(endpoint2)
          .expect(200)
          .then(function (response) {

            var actualContributors = response.body;

            var foundContributor = _.find(actualContributors, {name: contributorDjName});
            expect(_.isUndefined(foundContributor));//.toBeUndefined();
          })
          .catch(function (msg) {
            console.error('url was ' + apiUrl + endpoint2);

            done(msg);
          })

      })
      .catch(function (msg) {
        console.error('url was (delete) ' + apiUrl + endpoint1);

        done(msg);
      })
      .finally(done);
  });


});