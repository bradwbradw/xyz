var gulp = require('gulp');
var loopbackAngular = require('gulp-loopback-sdk-angular');

var bower = require('gulp-bower');
var rename = require("gulp-rename");
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify'),
  concat = require('gulp-concat');
var replace = require('gulp-replace');

var docs = require('gulp-ngdocs');
var exec = require('gulp-exec');
var exit = require('gulp-exit');

var del = require('del');

var constants = require('./constants');

var mongoCreds = constants.mongoCreds;

var keys = constants.keys;

var jshint = require('gulp-jshint');
var connect = require('gulp-connect');
var nodemon = require('gulp-nodemon');
var historyApiFallback = require('connect-history-api-fallback');
var browserSync = require('browser-sync').create();
var open = require('gulp-open');

var paths = {
  src: {
    sass: ['client/scss/**/*.scss', 'xyz-player-component/**/*.scss'],
    views: ['client/views/**/*.html', 'xyz-player-component/*.html'],
    scripts: 'client/scripts'
  }
};

var appName = 'xyzApp';

var TEMPLATE_HEADER = '\'use strict\';' +
'var app = window.angular.module(\'' + appName + '\');'
+ 'app.run([\'$templateCache\', function($templateCache) {';

function reloadB (done) {
  browserSync.reload();
  done();
}

if (process.env.NODE_ENV === 'production') {
  var apiUrl = constants.api.path;//'http://'+ constants.api.host+ ':'+ constants.api.port + constants.api.path + '/';
} else {
  var apiUrl = 'http://' + constants.domain + constants.api.path;
}
console.log('api Url is ', apiUrl);

gulp.task('loopback', function () {
  return gulp.src('./server/server.js')
    .pipe(loopbackAngular(
      {
        apiUrl: apiUrl
      }
    ))
    .pipe(rename('lb-services.js'))
    .pipe(gulp.dest('./client/scripts/services'));
});
//lb-ng server/server.js client/scripts/services/lb-services.js -u http://0.0.0.0:3000/api && node docs.js

gulp.task('clean', function () {
  return del('dist');
});

gulp.task('reload', reloadB);

gulp.task('sass:app', function () {

  return gulp.src([
      'client/scss/**/*.scss',
      'xyz-player-component/**/*.scss'
    ])
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('client/css'))
//    .pipe(browserSync.reload({stream: true}));
});
gulp.task('sass:player', function () {
  return gulp.src('xyz-player-component/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('xyz-player-component/css'))
//    .pipe(browserSync.reload({stream: true}));
});


gulp.task('sass', gulp.parallel('sass:app', 'sass:player'));

gulp.task('bower', function () {
  return bower()
    .pipe(gulp.dest('client/vendor'))
});

gulp.task('copyHtml:main', function () {
  return gulp.src([
      'client/views/**/*.html',
      'xyz-player-component/*.html'
    ])
    .pipe(gulp.dest('dist/views'))
});

//TODO: make a task write css that includes xyz-player-component's css, write it to stream/style.css

gulp.task('copyCss:stream', function () {
  return gulp.src('stream/style.css')
    .pipe(gulp.dest('stream-dist'))
});


gulp.task('copyImages', function () {
  return gulp.src('client/images/**/*')
    .pipe(gulp.dest('dist/images'))
});


gulp.task('useref:main', function () {
  return gulp.src('client/index.html')
    .pipe(replace('%%%facebookAppId', keys.public.fb))
    .pipe(replace('%%%scKey', keys.public.sc))
    .pipe(replace('%%%ytKey', keys.public.yt))
    .pipe(replace('%%%API_URL', apiUrl))
    .pipe(useref())
    //	.pipe(gulpIf('*.js',uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('useref:stream', function () {
  return gulp.src('stream/index.html')

    .pipe(replace('%%%facebookAppId', keys.public.fb))
    .pipe(replace('%%%scKey', keys.public.sc))
    .pipe(replace('%%%ytKey', keys.public.yt))
    .pipe(replace('%%%API_URL', apiUrl))
    .pipe(useref())
    //	.pipe(gulpIf('*.js',uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('stream-dist'))
});


gulp.task('browserSync:client', function (done) {
  browserSync.init({
    server: {
      baseDir: 'client',
      index: 'index.html',
      middleware: [historyApiFallback()],
      routes: {
        "/xyz-player-component": "xyz-player-component",
        "/client": "client",
        "/stream/xyz-player-component": "xyz-player-component",
        "/stream/xyz-player-component/css": "xyz-player-component/css",
        "/stream": "stream"
      }

    },
    injectChanges:true,
        logConnections: true,
    ghostMode: false,
    notify: false,
    browser:'firefox',
    ui: {
      port: 9006
    },
    port: 9005
  });
  done();
});

gulp.task('browserSync:dist', function (done) {
  browserSync.init({
    server: {
      baseDir: 'dist',
      index: 'index.html',
      middleware: [historyApiFallback()]
    },
    ghostMode: false,
    notify: false,
    reloadDelay: 500,
    port: 9000
  });
  done();
});



gulp.task('browserSync:stream', function (done) {
  browserSync.init({
    server: {
      baseDir: 'stream',
      index: 'index.html',
      middleware: [historyApiFallback()],
      routes: {
        "/xyz-player-component": "xyz-player-component",
        "/stream": "stream"
      }
    },
    ghostMode: false,
    notify: false,
    reloadDelay: 500,
    port: 9001
  });
  done();
});



gulp.task('templates', function () {

  var templateCache = require('gulp-angular-templatecache');

  return gulp.src(paths.src.views)
    .pipe(templateCache({templateHeader: TEMPLATE_HEADER}))
    .pipe(gulp.dest(paths.src.scripts));
});


gulp.task('watch:sass', function (done) {
  gulp.watch(paths.src.sass)
    .on('change', gulp.series('sass', reloadB) );
  done()
});

gulp.task('watch:views', function (done) {
  gulp.watch(paths.src.views, gulp.series('templates'));
  done();
});

gulp.task('watch:code', function (done) {

  gulp.watch([
      'client/scripts/**/*.js',
      'xyz-player-component/**/*.js',
      'xyz-player-component/**/*.html'
    ])
    .on('change', gulp.series('useref:main', 'copyImages', reloadB));
  done();
});

gulp.task('watch', gulp.parallel('watch:sass', 'watch:views', 'watch:code'));

gulp.task('exit', function (done) {
  done();
  process.exit(0);
});


gulp.task('build',
  gulp.series('clean', 'loopback', 'sass', 'bower','templates',
    gulp.parallel('useref:main', 'copyHtml:main', 'copyImages'),
    gulp.parallel('useref:stream', 'copyCss:stream'), 'exit')
);


gulp.task('serve', gulp.parallel('loopback', 'bower', 'sass', 'browserSync:client', 'watch'));

gulp.task('default', gulp.parallel('build','serve'));

/*

gulp.task('watchStream', gulp.parallel(['browserSync:stream', 'sass']), function () {
  gulp.watch('stream/scss/!**!/!*.scss', gulp.series(['sass']));
  gulp.watch([
    'stream/!*.html',
    'stream/style.css',
    'stream/views/!**!/!*.html',
    'stream/js/!**!/!*.js'
  ], browserSync.reload);
});
*/

/*
gulp.task('stream', function (callback) {
  gulp.series(
    gulp.parallel('browserSync:stream', 'watchStream'),
    callback
  )
});*/


gulp.task('serveApi', function () {
  nodemon({
    script: 'server/server.js',
    ext: 'js json html jade',
    ignore: 'client/*',
    env: {'NODE_ENV': 'development'}
  })
});


gulp.task('docs', function (done) {
  gulp.series('loopback', 'generate-docs', 'serve-docs', 'open-docs', done);
});

gulp.task('generate-docs', function () {

  var options = {
    scripts: [
      'http://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js',
      'http://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-animate.min.js'
    ]
  };

  return gulp.src(['./client/scripts/services/lb-services.js'])
    .pipe(docs.process(options))
    .pipe(gulp.dest('./docs'));

});

gulp.task('serve-docs', function (done) {
  connect.server({
    root: 'docs',
    livereload: false,
    fallback: 'docs/index.html',
    port: 8888
  })
  done();
});
gulp.task('open-docs', function () {
  return gulp.src('').pipe(
    open({uri: 'http://localhost:8888'})
  );
});

gulp.task('copy-staging-db', function (done) {
  gulp.series('save-db', 'overwrite-db-local', done);
});

gulp.task('save-db', function (done) {
  var hostColonPort = [mongoCreds.hosts[0].host, mongoCreds.hosts[0].port].join(':');
  var command = 'mongodump -h ' + hostColonPort + ' -d ' + mongoCreds.database + ' -u ' + mongoCreds.username + ' -p ' + mongoCreds.password + ' -o xyzDbDump';
  return gulp.src('')
    .pipe(exec(command), function cb(err, stdout, stderr) {
      console.log(stdout); // outputs the normal messages
      console.log(stderr); // outputs the error messages
      done();
//        return 0; // makes gulp continue even if the command failed
    })
    .pipe(exec.reporter())
});

gulp.task('overwrite-db-local', function (done) {
  var command = 'mongorestore --drop --host=127.0.0.1:27017 -d xyz xyzDbDump/' + mongoCreds.database;
  return gulp.src('')
    .pipe(exec(command), function cb(err, stdout, stderr) {
      console.log(stdout); // outputs the normal messages
      console.log(stderr); // outputs the error messages
      done();
//        return 0; // makes gulp continue even if the command failed
    })
    .pipe(exec.reporter())
});
