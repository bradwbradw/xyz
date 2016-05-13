var constants = require('../constants');

module.exports={
  "db": {
    "name": "db",
    "connector": "memory"
  },
  "xyzdb": {
    "name": "xyzdb",
    "connector": "mongodb",
    "url":constants.mongoUrl
  }
};
