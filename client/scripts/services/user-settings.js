'use strict';

/**
 * @ngdoc service
 * @name xyzApp.Utility
 * @description
 * # UserSettings
 * Service in the xyzApp.
 */
angular.module('xyzApp')
  .service('UserSettings', function ($rootScope, localStorageService) {

    var UserSettings = {

      map: {
        'sitewide-player-enabled': {
          default: true
        },
        'browser-level-fullscreen-enabled': {
          default: false
        },
        'gradient': {
          default: {
            name: 'shoreline',
            class: 'grad-shoreline'
          },

          options: [
            {
              name: 'algae',
              class: 'grad-algae'
            },
            {
              name: 'sherbet',
              class: 'grad-sherbet'
            },
            {
              name: 'shoreline',
              class: 'grad-shoreline'
            },
            {
              name: 'sunset',
              class: 'grad-sunset'
            },
            {
              name: 'coral',
              class: 'grad-coral'
            },
            {
              name: 'violet charcoal',
              class: 'grad-violet-charcoal'
            },
            {
              name: 'atlantis',
              class: 'grad-atlantis'
            }
          ]
        }
      },

      set: function (settingName, newValue) {
        localStorageService.set(settingName, newValue);
      },
      get: function (settingName) {

        if (_.isNull(localStorageService.get(settingName))) {
          return _.get(UserSettings.map, settingName + '.default');
        } else {
          return localStorageService.get(settingName);
        }
      },
      updateGradient: function (newGradient) {
        UserSettings.set('gradient', newGradient);
        $rootScope.updateBackground();
      }

    };

    return UserSettings;
  });
