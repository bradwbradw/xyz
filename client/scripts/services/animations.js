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

        return element.animate([
          {opacity: 0.1},
          {opacity: 1}
        ], {
          duration: 800,
          easing:'cubic-bezier(.08,.52,.85,.34)',
          iterations: 1
        });

      }
    }
  });