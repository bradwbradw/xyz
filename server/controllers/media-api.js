"use strict";

var SC = require('node-soundcloud'),
  _ = require('lodash'),
  when = require('when');

var YouTube = require('youtube-node');
var YT = new YouTube();

var constants = require('../../constants.js');

SC.init({
  id: constants.keys.public.sc
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
  }


}