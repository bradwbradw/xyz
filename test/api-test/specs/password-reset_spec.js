
var request = require("supertest"),
  _ = require('lodash'),
  when = require('when');

var constants = require('../../../constants');


var fixtures = {
  users: require('../fixtures/users.js'),
  songs: require('../fixtures/songs.js')
};


var user = fixtures.users.owner;

//var loopback = require('loopback');


var urlBase = 'http://'
  + constants.api.host
  + ':'
  + constants.api.port + '/';


var path = 'password-reset/send-request';

describe(' password reset tests ', function () {

  it('should POST to the password reset endpoint', function (done) {

    request(urlBase)
      .post(path)
      .send({email:user.credentials.email})
      //      .set('Authorization', authorization.id)
      .expect(200)
      .then(function (response) {
        console.log('response:', response.body);
        console.log('you should get the password reset request in email');

      })
      .catch(function (err) {
        console.error(err);
        done(err);
      })
      .finally(done);

  });


  it('should POST to the password reset endpoint', function (done) {

    request(urlBase)
      .post(path)
      .send({email:user.credentials.email})
      //      .set('Authorization', authorization.id)
      .expect(200)
      .then(function (response) {
        console.log('response:', response.body);
        console.log('you should get the password reset request in email');

      })
      .catch(function (err) {
        console.error(err);
        done(err);
      })
      .finally(done);

  });

});