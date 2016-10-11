exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec/**/*.js'],
  params:{
    login:{
      email:'brad@brad.brad',
      password:'brad'
    }
  }
};