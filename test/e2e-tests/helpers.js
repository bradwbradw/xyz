'use strict';

const fs = require('fs'),
  request = require('request'),
  when = require('when');

const constants = require('../../constants');

const apiUrl = 'http://' + (constants.api.host || 'localhost') + ':' + constants.api.port + constants.api.path;

const writeScreenShot = function (data, filename) {
  const stream = fs.createWriteStream(filename);
  stream.write(new Buffer(data, 'base64'));
  stream.end();
};


module.exports = {

  login: function (browser) {

    browser.get('/signup-login');

    var emailInput = element(by.css('#login-email-field'));
    var passwordInput = element(by.css('#login-password-field'));
    var loginForm = element(by.css('#login-form'));

    emailInput.sendKeys(browser.params.login.email);
    passwordInput.sendKeys(browser.params.login.password);
    loginForm.submit();

    browser.waitForAngular();

  },
  turnOffPlayer: function (browser) {

    browser.get('/');

    var setToFalse = function () {
      return browser.executeScript('localStorage.setItem("sitewide-player","false");')
    };

    var showSetting = function () {
      return browser.executeScript("return window.localStorage.getItem('sitewide-player');")
        .then(function (value) {
          console.log('sitewide-player is now ', value);
        });
    };

    setToFalse().then(showSetting);


  },
  screenshot: function (browser, filename) {

    return browser.takeScreenshot().then(function (png) {
      writeScreenShot(png, __dirname + '/screenshots/' + filename);
    });
  },
  getSpace: function () {
    return when.promise(function (resolve, reject) {
      request.get(apiUrl + 'Spaces', {
        json: true,
        params: {
          filter: {"where": {"public": true}}
        }
      }, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result.body[0]);
        }
      })

    })
  }


};