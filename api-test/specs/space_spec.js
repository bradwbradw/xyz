
var express = require("express")
  , request = require("supertest-as-promised");

var constants = require('../../constants');

var apiUrl = 'http://'+ constants.api.host+ ':'+ constants.api.port + constants.api.path + '/';

describe(' space api tests ', function(){

  it('should load the spaces', function(done){

    var endpoint = 'spaces/';

    request(apiUrl)
      .get(endpoint)
      .expect(200)
      .then(function(response){
        console.log('response:',response.body);

      })
      .catch(function(msg){
        done(msg)
      })
      .finally(done);

  })

});