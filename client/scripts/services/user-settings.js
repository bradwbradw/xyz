'use strict';

/**
 * @ngdoc service
 * @name xyzApp.Utility
 * @description
 * # UserSettings
 * Service in the xyzApp.
 */
angular.module('xyzApp')
  .service('UserSettings', function (localStorageService) {

    var UserSettings = {

        map: {
          'sitewide-player-enabled': {
            default: true
          },
          'browser-level-fullscreen-enabled': {
            default: false
          }
        },

        set: function (settingName, newValue) {
          localStorageService.set(settingName, newValue);
        },
        get: function (settingName) {

          if (_.isNull(localStorageService.get(settingName))) {
            return _.get(UserSettings.map, settingName+'.default');
          } else {
            return localStorageService.get(settingName);
          }
        }

    };

    return UserSettings;
  });
