module.exports={
  "db": {
    "name": "db",
    "connector": "memory"
  },
  "xyzdb": {
    "name": "xyzdb",
    "connector": "mongodb",
    "url":process.env.MONGODB_URL || 'mongodb://heroku_cc7gbkr1:rusl214k9b95o5d7evobgufue6@ds059135.mongolab.com:59135/heroku_cc7gbkr1'
  }
};
