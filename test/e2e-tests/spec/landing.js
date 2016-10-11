

describe('landing page tests', function () {

  beforeAll(function () {
    browser.get('/');
  });

  it('should see some public spaces', function () {

    var publicSpaces = element.all(by.repeater('space in publicSpaces'));

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
    browser.get('/signup-login');

    var emailInput = element(by.model('loginData.email'));
    var passwordInput = element(by.model('loginData.password'));
    var submitButton = element(by.css('#login-form'));

    emailInput.sendKeys(browser.params.login.email);
    passwordInput.sendKeys(browser.params.login.password);
    submitButton.click();

    browser.get('/');

  });

  it('should see user settings icon in corner', function(){

    expect(element(by.css('#settings-button')).isPresent()).toBe(true);
  })



});