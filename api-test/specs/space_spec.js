var express = require("express")
  , request = require("supertest-as-promised"),
  _ = require('lodash');

var constants = require('../../constants');

var fixtures = {
  users: require('../fixtures/users.js')
};

var apiUrl = 'http://' + constants.api.host + ':' + constants.api.port + constants.api.path + '/';

var authorization;
var ownSpaces;
var publicSpaces;
describe(' space api tests ', function () {

  it('should login', function (done) {

    console.log('users is ', fixtures.users.owner);
    var endpoint = 'djs/login?include=user';

    request(apiUrl)
      .post(endpoint)
      .send(fixtures.users.owner.credentials)
      .expect(200)
      .then(function (response) {
        authorization = response.body;
        expect(authorization.id).toBeDefined();
        expect(authorization.userId).toBeDefined();
      })
      .catch(function (msg) {
        console.error('url was ' + apiUrl + endpoint);
        console.error('error looks like ' + msg.message);
        done(msg)
      })
      .finally(done);
  })


  it('should load the owner\'s own spaces', function (done) {

    var endpoint = 'djs/' + authorization.userId + '/spaces/';

    request(apiUrl)
      .get(endpoint)
      .set('Authorization', authorization.id)
      .expect(200)
      .then(function (response) {
        console.error('url was ' + apiUrl + endpoint);
        console.log('response:', response.body);
        ownSpaces = response.body;
        expect(_.size(ownSpaces)).toBeGreaterThan(0);
        expect(ownSpaces[0].ownerId).toEqual(authorization.userId);

      })
      .catch(function (msg) {
        done(msg)
      })
      .finally(done);

  })

  it('should load the public spaces', function (done) {

    var endpoint = 'spaces/';

    request(apiUrl)
      .get(endpoint)
      .expect(200)
      .then(function (response) {
        console.error('url was ' + apiUrl + endpoint);
        console.log('response:', response.body);
        publicSpaces = response.body;
        expect(_.size(publicSpaces)).toBeGreaterThan(0);
      })
      .catch(function (msg) {
        done(msg)
      })
      .finally(done);

  })

});