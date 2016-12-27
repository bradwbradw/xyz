'use strict';

/**
 * @ngdoc service
 * @name xyzApp.Extract
 * @description
 * # Extract
 * Gets the artist, title, id and length from a service song URL
 */
angular.module('xyzApp')
  .service('Animations', function () {

    return {
      enterGrow: function (element) {

        return element.animate({
          opacity: [0.5, 1],
          transform: ['scale(0.5)', 'scale(1)']
        }, {
//          direction: 'alternate',
          duration: 1000,
          iterations: 1
        });

      }
    }
  });