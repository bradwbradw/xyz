'use strict';
var mongoDbUriTool = require('mongodb-uri');

var mongoUrl = process.env.MONGODB_URL || process.env.MONGO_URL || 'mongodb://heroku_cc7gbkr1:rusl214k9b95o5d7evobgufue6@ds059135.mongolab.com:59135/heroku_cc7gbkr1';

var mongoCreds = mongoDbUriTool.parse(mongoUrl);
/* example creds object:
 { scheme: 'mongodb',
 username: 'heroku_cc7gbkr1',
 password: 'rusl214k9b95o5d7evobgufue6',
 database: 'heroku_cc7gbkr1',
 hosts: [ { host: 'ds059135.mongolab.com', port: 59135 } ]
 }
 */

var port = process.env.PORT || 5005;
var ip = process.env.IP || 'localhost';
console.log('ip is ', ip);
console.log('api / built app port is ', port);


module.exports = {
  api: {
    host: process.env.API_HOST || '',
    path: process.env.API_URL || '/api/',
    port: port
  },
  keys: {
    public: {
      fb: process.env.FB_APP_ID || 0,//'1507355422928214',
      sc: process.env.SC_CLIENT_ID || 'cb16ad8471c6da3d93dc120fb8160b89',
      yt: process.env.YT_KEY || 'AIzaSyBxKs-kfPHtRL1boRrsOtSvoauIFJJLC4A'
    },
    private: {
      sc: process.env.SC_CLIENT_SECRET || 'f0c019c1b13ede7f5458d955e6c92f2a'

    }
  },
  mail: {
    key: process.env.MAILGUN_KEY || 'key-57050be36fbfd2a9d17776fd5d771eb5',
    domain: process.env.MAILGUN_DOMAIN || 'staging-mg.xyz.gs'
  },
  mongoUrl: mongoUrl,
  mongoCreds: mongoCreds,
  domain: process.env.DOMAIN || ip +':'+ port

};
