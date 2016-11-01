// test syntax:
//      http://jasmine.github.io/2.0/introduction.html

var request = require("supertest-as-promised"),
  _ = require('lodash'),
  when = require('when');

var constants = require('../../constants');
var loginEndpoint = 'djs/login?include=user';

var fixtures = {
  users: require('../fixtures/users.js'),
  songs: require('../fixtures/songs.js')
};


var loginAs = function (credentials) {
  return request(apiUrl)
    .post(loginEndpoint)
    .send(credentials)
    .then(function (response) {
      console.log('\n token for ' + credentials.email + ' is ' + _.get(response.body, 'id'));
      return response.body;
    })
    .catch(function (err) {
      return when.reject(err);
    })
};

var apiUrl = 'http://' + (constants.api.host || 'localhost') + ':' + constants.api.port + constants.api.path;

describe(' admin access ', function () {

  it('should see emails on user / dj find() endpoint', function (done) {

    loginAs(fixtures.users.admin.credentials)
      .then(function (authorization) {
        request(apiUrl)
          .get('djs')
          .set('Authorization', authorization.id)
          .expect(200)

          .then(function (response) {
            console.log('response body is ', response.body);
            var djs = response.body;
            expect(_.first(djs).email).toBeDefined();
            done()
          })
          .catch(done)
      });
  });

  it('(non-admin) should not see emails on user / dj find() endpoint', function (done) {

    loginAs(fixtures.users.random.credentials)
      .then(function (authorization) {
        request(apiUrl)
          .get('djs')
          .set('Authorization', authorization.id)
          .expect(200)

          .then(function (response) {
            console.log('response body is ', response.body);
            var djs = response.body;
            expect(_.first(djs).email).toBeUndefined();
            done()
          })
          .catch(done)
      });
  });
});