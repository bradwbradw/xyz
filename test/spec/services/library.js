'use strict';

describe('Service: Library', function () {

  // load the service's module
  beforeEach(module('xyzApp'));

  // instantiate service
  var Library, Server, $q, $timeout;
  var $httpBackend, requestHandler;

  var testSongs =
    [
      {
        "x": 200,
        "y": 301,
        "provider_id": "8VdMdTEcAfU",
        "provider": "youtube",
        "title": "step into liquid",
        "artist": "Ultrademon",
        "url": "https://www.youtube.com/watch?v=8VdMdTEcAfU",
        "length": 30
      },
      {
        "url": "https://soundcloud.com/listentotsars/xe-fatigue-s-m-003",
        "artist": "mount bankk",
        "title": "316",
        "provider": "soundcloud",
        "x": 34,
        "y": 70,
        "length": 30,
        "provider_id": "157758349"
      },
      {
        "url": "https://soundcloud.com/maddecent/i-just-go-obey-city-remix",
        "artist": "ecco foul",
        "title": "fatigue",
        "provider": "soundcloud",
        "x": 80,
        "y": 150,
        "length": 40,
        "provider_id": "69208872"
      }
    ];


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

  beforeEach(inject(function (_Library_, _Server_, _$timeout_) {
    Library = _Library_;
    Server = _Server_;
    $timeout = _$timeout_;
  }));

  it('should have a library', function () {
    expect(!!Library).toBe(true);
  });

  it('should have zero songs before loading', function () {
    expect(Library.getLibrary().length).toBe(0);
  });

  it('should load', function (done) {
    Library.loadLibrary()
      .then(function (songs) {
        expect(songs.length).toEqual(jasmine.any(Number));
        $timeout(done);

      }).catch(function (error) {
        fail(error);
      });
  });

  var added_song_ids = [];
/*

  it('should save 3 songs and delete 3 songs', function (done) {

    Library.loadLibrary()
      .then(function () {
        var num = Library.getLibrary().length;
        var promises = [];

        _.each(testSongs, function (song) { //jshint ignore:line
          promises.push(Library.add(song).then(
            function (result) {
              added_song_ids.push(result.data._id);
            }
          ));
        });

        $q.all(promises)
          .then(function () {
            Library.loadLibrary().then(function () {
              expect(Library.getLibrary().length).toBe(num + testSongs.length);

              var promises2 = [];
              _.each(added_song_ids, function (id) {
                promises2.push(Library.remove(id));
              });

              $q.all(promises2)
                .then(function () {

                  Library.loadLibrary().then(function () {

                    expect(Library.getLibrary().length).toBe(num);
                    $timeout(done);

                  });
                });

            });
          });


      });


  });
*/

});
