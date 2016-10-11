describe('landing page tests', function() {
  it('should see some public spaces', function() {
    browser.get('/');


    var todoList = element.all(by.repeater('space in publicSpaces'));
/*
    element(by.model('todoList.todoText')).sendKeys('write first protractor test');
    element(by.css('[value="add"]')).click();
*/

    expect(todoList.count()).toBeGreaterThan(1);
  });
});