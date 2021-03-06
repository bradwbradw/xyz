// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-10-25 using
// generator-karma 1.0.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'client/vendor/angular/angular.js',
      'client/vendor/angular-sanitize/angular-sanitize.js',
      'client/vendor/angular-ui-router/release/angular-ui-router.js',
      'client/vendor/lodash/lodash.js',
      'client/vendor/angular-easyfb/build/angular-easyfb.js',
      'client/vendor/angular-local-storage/dist/angular-local-storage.js',
      'client/vendor/angular-resource/angular-resource.js',
      'client/vendor/angular-mocks/angular-mocks.js',
      // endbower
      "client/scripts/**/*.js",
      'test/unit-tests/ngMockHttp.js',
      'test/unit-tests/spec/test-serverConfig.js',
      "test/unit-tests/spec/**/*.js"
    ],


    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
