
var request = require("supertest-as-promised"),
  _ = require('lodash'),
  when = require('when');

var constants = require('../../constants');


var urlBase = 'http://'
  + constants.api.host
  + ':'
  + constants.api.port + '/';


var path = 'password-reset/send-request';


describe(' password reset tests ', function () {

  it('should POST to the password reset endpoint', function (done) {

    request(urlBase)
      .post(path)
      .send({email:'foo@bar.com'})
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