exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
//  seleniumServerJar: '../../node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-2.53.1.jar',
//  specs: ['spec/**/*.js'],
  params: {
    login: {
      email: 'tester@xyz.gs',
      password: 'testtest'
    }
  }
};