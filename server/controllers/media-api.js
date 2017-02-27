"use strict";

var SC = require('node-soundcloud'),
  _ = require('lodash'),
  when = require('when');

var YouTube = require('youtube-node');
var YT = new YouTube();

var constants = require('../../constants.js');

SC.init({
  id: constants.keys.public.sc,
  secret: constants.keys.private.sc,
  // when application goes through, change to
  //  /oauth/soundcloud/redirect
  uri: constants.domain + '/sc_callback'
});

YT.setKey(constants.keys.public.yt);

var checkAvailability = {

  soundcloud: function (id) {

    return when.promise(function (resolve, reject) {

      SC.get('/tracks/' + id, function (err, track) {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    }).catch(function () {
      return when.resolve(false);
    })

  },
  youtube: function (id) {

    return when.promise(function (resolve, reject) {

      YT.getById(id, function (error, result) {
        if (error) {
          reject(error);
        }
        else {
//            console.log(JSON.stringify(result, null, 2));
          if (_.size(_.get(result, 'items')) >= 1) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    })
      .catch(function (err) {
        console.error(err);
        return when.resolve(false);
      });

  }
};
module.exports = {

  checkForAvailability: function (item) {
    if (item.provider === 'soundcloud' || item.provider === 'youtube') {
      return checkAvailability[item.provider](item.provider_id)
        .catch(function (err) {
          console.error(err);
          return when.reject(err);
        });
    } else {
      console.error('item provider was not found for: ', item);
      return when.reject('item provider was not found for: ', item);
    }
  },

  oauth: {
    soundcloud: {
      init: function (req, res) {

        var url = SC.getConnectUrl();
        console.log('soundcloud connect url: ', url);
        res.writeHead(301, {location: url});
        res.end();
      },
      handleRedirect: function (req, res) {
        var code = req.query.code;

        SC.authorize(code, function (err, accessToken) {
          if (err) {
            throw err;
          } else {
            // Client is now authorized and able to make API calls
            console.log('access token:', accessToken);
          }
        });
      }
    }
  }
};
