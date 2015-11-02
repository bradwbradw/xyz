'use strict';

describe('Service: Extract', function () {

  beforeAll(function(){

      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });
  // load the service's module
  beforeEach(module('xyzApp'));



  // instantiate service
  var Extract, $q, $timeout;
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


  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });



  beforeEach(inject(function (_Extract_, _$q_, _$timeout_) {
    Extract = _Extract_;
    $q = _$q_;
    $timeout = _$timeout_;

  }));



  it('should do something', function () {
    expect(!!Extract).toBe(true);
  });

  it('should return false if garbage url', function () {
    expect(Extract.determineService('www.garbage.com')).toBe(false);
  });

  it('should recognize a youtube url', function () {
    var youtubeUrl = 'https://www.youtube.com/watch?v=eu2h9FfFAtQ';
    expect(Extract.determineService(youtubeUrl)).toBe('youtube');
  });


  it('should recognize a bandcamp url (artist is subdomain)', function () {
    var url = 'http://anansi.bandcamp.com/track/voyage';
    expect(Extract.determineService(url)).toBe('bandcamp');
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
//          return deferred.resolve('donkey');//{id:id});

        },80);

//      return deferred.promise;

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

    Extract.getData('youtube', youtubeUrl)
      .then(
      function (result) {
        expect(result).toEqual(correctData);
        $timeout(done);
      });
  });



  it('should get data from a short youtube url', function (done) {
    var youtubeUrl = 'https://youtu.be/eu2h9FfFAtQ';

    var correctData = {provider:'youtube', provider_id: 'eu2h9FfFAtQ'};

    Extract.getData('youtube', youtubeUrl)
      .then(
      function (result) {
        expect(result).toEqual(correctData);
        $timeout(done);
      });
  });

  it('should get data from a bandcamp url', function (done) {
    var url = 'http://anansi.bandcamp.com/track/voyage';

    var correctData = { provider:'bandcamp', provider_id: '204637545'};

    Extract.getData('bandcamp', url)
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


    Extract.getData('bandcamp', url)
      .then(
      function (result) {
        console.log('bandcamp test returned');
        expect(result).toEqual(correctData);
        $timeout(done);
      });
  });

});
