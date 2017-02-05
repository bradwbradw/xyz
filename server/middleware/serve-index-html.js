var _ = require('lodash');
module.exports = function () {

  return function fallback(req, res) {

    // NOTE: __dirname ends with "/server/middleware"
     //  console.log('serving relative to dirname: ',__dirname);

    console.log('(track) '+_.get(req, 'originalUrl')+ ' '+ _.get(req, 'ip') + ' serving index.html');
    res.sendFile('dist/index.html',{
      root:__dirname+'/../..'
    });
  };
};