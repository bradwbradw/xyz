describe('landing page tests', function () {

  beforeAll(function () {
    browser.get('/');
  });

  it('should see some public spaces', function () {

    var publicSpaces = element.all(by.repeater('space in publicSpaces'));

    expect(publicSpaces.count()).toBeGreaterThan(1);
  });

  it('should be able to navigate to account', function () {

    var accountLink = element(by.id('signup-login-link'));

    accountLink.click();

    expect(browser.getLocationAbsUrl())
      .toContain('signup-login');
  });


});