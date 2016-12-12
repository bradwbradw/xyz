var helpers = require('../helpers'),
  _ = require('lodash');

var userSearch = 'bob';

// TODO test data details:
/*

 first (left-most in landing page) space that belongs to test user should:
 - have a name
 - have 0 contributors

 only one user must have substring 'bob'

 at least 2 public spaces
 */

var contributorsRepeater = 'contributor in Spaces.current().contributors';

describe('space page tests', function () {

  beforeAll(function () {
    helpers.turnOffPlayer(browser);
    helpers.login(browser);
    browser.get('/');
    var firstEditableSpace = element.all(
      by.repeater("space in Spaces.getOwn()")
    ).first();
    firstEditableSpace.element(by.css('a')).click();
  });

  beforeEach(function () {
    browser.waitForAngular();
  });


  it('should have an svg element', function () {
    var svg = element(by.css('svg'));
    expect(svg.isPresent()).toBeTruthy();
  });

  it('should have a top bar', function () {
    var topBar = element(by.css('.top-bar'));
    expect(topBar.isPresent()).toBeTruthy();
  });

  var title = 'unset title';
  it('should have a title', function () {
    var topBarTitle = element(by.css('#bar-title'));

    expect(topBarTitle.isPresent()).toBeTruthy();

    title = topBarTitle.getText().then(function (text) {
      title = _.dropRight(text.split(' ')).join(' '); //  separate label from play arrow
      console.log('space title is ', title);
    });
  });

  it('should have an edit icon', function () {
    var editButton = element(by.css('#edit-space'));
    expect(editButton.isPresent()).toBeTruthy();
  });

  it('click on edit icon should show sidebar', function () {
    var editButton = element(by.css('#edit-space'));
    editButton.click();
    var sidebar = element(by.css('.sidebar-container'));
    expect(sidebar.isPresent()).toBeTruthy();
    editButton.click(); // close it again
  });


  describe('editing space sidebar', function () {
    beforeAll(function () {
      var editButton = element(by.css('#edit-space'));
      editButton.click();
    });

    afterAll(function () {
      var nameInput = element(by.model('spaceEdits.name'));
      nameInput.clear().sendKeys(title, protractor.Key.ENTER);

      var contributorsList = element.all(by.repeater(contributorsRepeater));
      contributorsList.each(function (element, index) {
        var minusButton = element.element(by.css('.icon-btn'));
        minusButton.click();
        console.log('takedown: unsetting contributor #' + index+1);
      })
    });

    it('should show same title in name input element', function () {
      var nameInput = element(by.model('spaceEdits.name'));
      expect(nameInput.getAttribute('value')).toEqual(title);
    });

    it('should change name of space', function () {
      var nameInput = element(by.model('spaceEdits.name'));
      nameInput.clear().sendKeys('cool new name', protractor.Key.ENTER);

      element(by.css('#space-edit-form md-icon')).click();

      var topBarTitle = element(by.css('#bar-title'));
      expect(topBarTitle.getText()).toContain('cool new name');

    });

    it('should be able to search for users to add as contributors', function () {
      var nameInput = element(by.model('userSearchQ'));
      nameInput.clear().sendKeys(userSearch);

      var results = element.all(by.repeater('user in getUserSearchResults()'));

      expect(results.first().getText()).toContain(userSearch);

    });

    it('should be able to add a contributor', function () {
      var nameInput = element(by.model('userSearchQ'));
      nameInput.clear().sendKeys(userSearch);

      var results = element.all(by.repeater('user in getUserSearchResults()'));
      results.first().element(by.css('.icon-btn')).click();

      var contributorsList = element.all(by.repeater(contributorsRepeater));

      expect(contributorsList.first().getText()).toContain(userSearch);

    });


  });


  describe('adding items sidebar view', function () {

    beforeAll(function () {
      var addButton = element(by.css('#add-to-space'));
      addButton.click();
    });

    describe('searching for asdf', function () {

      beforeAll(function () {

        var searchInput = element(by.model('newText'));
        searchInput.sendKeys('asdf');
        browser.sleep(1000); // let debounce finish

      });

      it('should show asdf in search input', function () {

        var searchInput = element(by.model('newText'));
        expect(searchInput.getAttribute('value')).toEqual('asdf');
      });

      it('should show a list of results', function () {

        var results = element.all(by.repeater('item in Library.getSearchResults()'));

        expect(results.count()).toBeGreaterThan(2);

      });

      it('should show less if filtering on first filter', function () {

        element.all(by.repeater('item in Library.getSearchResults()'))
          .count()
          .then(function (num) {
            console.log('number of results is ', num);

            var filters = element.all(by.repeater('(filterName, value) in filters'));
            filters.last().click();

            expect(element.all(by.repeater('item in Library.getSearchResults()')).count()).toBeLessThan(num);
          })

      })

    });

  });

});