var helpers = require('../helpers'),
  _ = require('lodash');

describe('login logout', function () {

  let testSpace;
  beforeAll(function (done) {
    helpers.getSpace()
      .then(space => {
        testSpace = space;
        console.log('got space: ', testSpace);
        done();
      })
  });

  describe('handling an expired token', function () {

    beforeEach(function () {

      helpers.turnOffPlayer(browser);
      helpers.login(browser);
//      browser.get('/');
      browser.executeScript('localStorage.setItem("$LoopBack$accessTokenId","expired-token");')
      browser.waitForAngular();
      // });
    });


    it('should not be crashed when landing on home page', function () {
      browser.get('/');
      browser.waitForAngular();
      var firstEditableSpace = element.all(
        by.repeater("space in Spaces.getPublic()")
      ).first();
      expect(firstEditableSpace.isPresent()).toBeTruthy('cannot see any space thumbnails. seems like a crash');
    });

    it('should not be crashed when landing on space page', function () {
      browser.get(`/space/${testSpace.id}`);
      browser.waitForAngular();
      let topBar = element(by.css('#bar-logo'));
      expect(topBar.isPresent()).toBeTruthy('cannot see top bar. seems like a crash');
    });
  })
});