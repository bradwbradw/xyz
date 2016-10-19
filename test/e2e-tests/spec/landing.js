var helpers = require('../helpers'),
  _ = require('lodash');

describe('landing page tests', function () {

  beforeAll(function () {
    browser.get('/');
    browser.waitForAngular();
  });

  it('should see some public spaces', function () {

    var publicSpaces = element.all(by.repeater('space in Spaces.getPublic()'));

    expect(publicSpaces.count()).toBeGreaterThan(1);
  });

  it('should be able to navigate to account', function () {

    var signUpLink = element(by.id('signup-login-link'));

    signUpLink.click();

    expect(browser.getLocationAbsUrl())
      .toContain('signup-login');

    browser.get('/');

  });
  it('should be able to play a space', function () {

    var playButton = element(by.css('.thumbnail-icons .icon-btn'));

    playButton.click();

    var EC = protractor.ExpectedConditions;
    // Waits for the element with id 'abc' to be visible on the dom.
    browser.wait(EC.visibilityOf($('.xyz-player')), 5000);

  });

  it('should be able to navigate to a space', function () {

    var spaceLink = element(by.css('.space-thumbnail a'));

    spaceLink.click();

    expect(browser.getLocationAbsUrl())
      .toContain('space');

    browser.get('/');

  });


});


describe('landing page tests (logged in)', function () {

  beforeAll(function () {
    helpers.login(browser);
    browser.get('/');
  });

  it('should see user settings icon in corner', function () {

    expect(element(by.css('#user-settings')).isPresent()).toBe(true);
  });

  xdescribe('create and delete a space', function () {
    afterAll(function () {

      browser.get('space/'+spaceId);
      browser.waitForAngular();

      var addButton = element(by.css('#edit-space'));
      addButton.click();
      browser.waitForAngular();
      var deleteButton = element(by.css('.sidebar-container button'));
      deleteButton.click();
      // FIXME alert causes failure, probably because of chromedriver version
      // see https://github.com/mllrsohn/gulp-protractor/issues/120
    });

    it('should be able to create a space', function () {

      var createSpaceButton = element(by.css('#create-new-space'));

      createSpaceButton.click();
      browser.getLocationAbsUrl()
        .then(function(url){

          console.log('0000 url is ', url);
          var parts = url.split('space/');
          spaceId = _.last(parts);
          console.log('1111 id is ', spaceId);

          expect(url)
            .toContain('space');
        });


    });
  })


});