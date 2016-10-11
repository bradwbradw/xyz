module.exports = function () {

  return function fallback(req, res, next) {

    // NOTE: __dirname ends with "/server/middleware"
    //   console.log('serving relative to dirname: ',__dirname);

    res.sendFile('dist/index.html',{
      root:__dirname+'../../..'
    });
  };
};