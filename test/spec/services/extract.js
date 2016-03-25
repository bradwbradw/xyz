'use strict';

describe('Service: Extract', function () {

  beforeAll(function(){

      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });
  // load the service's module
  beforeEach(module('xyzApp'));

  var $httpBackend, requestHandler;

  beforeEach(angular.mock.http.init);
  afterEach(angular.mock.http.reset);
  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');

    requestHandler = $httpBackend.whenGET()
      .passThrough();

    requestHandler = $httpBackend.whenPOST()
      .passThrough();

    requestHandler = $httpBackend.whenDELETE()
      .passThrough();
  }));

    // instantiate service
  var Extract, $timeout, $window, Server, serverConfig, $q;

  beforeEach(inject(function (_Extract_, _serverConfig_,_Server_, _$q_,_$timeout_, _$window_ ) {
    Extract = _Extract_;
    $timeout = _$timeout_;
    $window = _$window_;
    serverConfig = _serverConfig_;
    Server = _Server_;
    $q = _$q_;

  }));


  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  it('should do something', function () {
    expect(!!Extract).toBe(true);
  });

  it('should return false if garbage url', function () {
    expect(determineService('www.garbage.com')).toBe(false);
  });

  it('should recognize a youtube url', function () {
    var youtubeUrl = 'https://www.youtube.com/watch?v=eu2h9FfFAtQ';
    expect(determineService(youtubeUrl)).toBe('youtube');
  });


  it('should recognize a bandcamp url (artist is subdomain)', function () {
    var url = 'http://anansi.bandcamp.com/track/voyage';
    expect(determineService(url)).toBe('bandcamp');
  });



  it('should do sample promise shit', function () {
        expect({}).toBeDefined();

  });

  it('should do a random promise timeout resolve', function (done) {

    var doSomething = function(){

        console.log('doing something');
        var deferred = $q.defer();

        return $timeout(function () {
          deferred.notify('starting...');
          return 'donkey';
//          return loading.resolve('donkey');//{id:id});

        },80);

//      return loading.promise;

    };

    doSomething().then(function(result){
        console.log('promise resolved');
      expect(result).toBe('donkey');
        $timeout(done);
    },
      function (error) {
        console.log('error');
      },
      function (update) {
        console.log('got an update: ', update);

      });

//    $timeout.flush(1000);

  });


  it('should get data from a youtube url', function (done) {
    var youtubeUrl = 'https://www.youtube.com/watch?v=eu2h9FfFAtQ';

    var correctData = {provider:'youtube', provider_id: 'eu2h9FfFAtQ'};

    Extract.getData(youtubeUrl)
      .then(
      function (result) {
        expect(result).toEqual(correctData);
        $timeout(done);
      });
  });



  it('should get data from a short youtube url', function (done) {
    var youtubeUrl = 'https://youtu.be/eu2h9FfFAtQ';

    var correctData = {provider:'youtube', provider_id: 'eu2h9FfFAtQ'};

    Extract.getData(youtubeUrl)
      .then(
      function (result) {
        expect(result).toEqual(correctData);
        $timeout(done);
      });
  });

  it('should get data from a bandcamp url', function (done) {
    var url = 'http://anansi.bandcamp.com/track/voyage';

    var correctData = { provider:'bandcamp', provider_id: '204637545'};

    Extract.getData(url)
      .then(
      function (result) {
        console.log('bandcamp test returned');
        expect(result).toEqual(correctData);
        $timeout(done);
      });
  });


  it('should get data from a bandcamp Pro url', function(done){
    var url ='http://out.gorge.in/track/harder-they-gorge';

    var correctData = {provider:'bandcamp', provider_id: '1972438495'};


    Extract.getData(url)
      .then(
      function (result) {
        console.log('bandcamp test returned');
        expect(result).toEqual(correctData);
        $timeout(done);
      });
  });

  it('should get data from soundcloud url', function(done){
    var url = 'https://soundcloud.com/cybersonicla/cybersonicla-009-retina-set';

    var correctData = {provider:'soundcloud', provider_id:'228009072'};

    Extract.getData(url)
      .then( function(result){
        expect(result).toEqual(correctData);
        $timeout(done);
      });
  });


});
