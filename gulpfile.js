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

var del = require('del');
var runSequence = require('run-sequence');

var constants = require('./constants');

var mongoCreds = constants.mongoCreds;

var keys = constants.keys;

var apiUrl = constants.api.path + '/';//'http://'+ constants.api.host+ ':'+ constants.api.port + constants.api.path + '/';

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
  return del.sync('dist');
});

gulp.task('sass', function () {
  var mainSass = gulp.src([
      'client/scss/**/*.scss',
      'xyz-player-component/**/*.scss'
    ]
    )
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('client/css'));

  var xyzPlayerComponentSass =
    gulp.src('xyz-player-component/**/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('xyz-player-component/css'));

  return [mainSass, xyzPlayerComponentSass];

});

gulp.task('bower', function () {
  return bower()
    .pipe(gulp.dest('client/vendor'))
});

gulp.task('copyHtml:main', function () {
  return gulp.src([
      'client/views/**/*.html',
      'xyz-player-component/*.html'
    ]
    )
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

    .pipe(replace('%%%facebookAppId', keys.fb))
    .pipe(replace('%%%scKey', keys.sc))
    .pipe(replace('%%%ytKey', keys.yt))
    .pipe(replace('%%%API_URL', apiUrl))
    .pipe(useref())
    //	.pipe(gulpIf('*.js',uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('useref:stream', function () {
  return gulp.src('stream/index.html')

    .pipe(replace('%%%facebookAppId', keys.fb))
    .pipe(replace('%%%scKey', keys.sc))
    .pipe(replace('%%%ytKey', keys.yt))
    .pipe(replace('%%%API_URL', apiUrl))
    .pipe(useref())
    //	.pipe(gulpIf('*.js',uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('stream-dist'))
});

gulp.task('build:production', function (callback) {
  runSequence('clean', 'loopback', 'sass', 'bower',
    ['useref:main', 'copyHtml:main', 'copyImages'], ['useref:stream', 'copyCss:stream'],
    callback
  )
});

var jshint = require('gulp-jshint');
var connect = require('gulp-connect');
var nodemon = require('gulp-nodemon');
var historyApiFallback = require('connect-history-api-fallback');
var browserSync = require('browser-sync');
var open = require('gulp-open');


gulp.task('watch', ['browserSync:client', 'sass'], function () {
  gulp.watch([
    'client/scss/**/*.scss',
    'xyz-player-component/**/*.scss'
  ], ['sass']);
  gulp.watch([
    'client/*.html',
    'client/css/*.css', // this line is actually not supposed to be here, updated sass should get compiled and injected without reloading
    'client/views/**/*.html',
    'client/scripts/**/*.js',
    'xyz-player-component/**/*.js',
    'xyz-player-component/**/*.html'
  ], browserSync.reload);
});

gulp.task('browserSync:client', function () {
  browserSync({
    server: {
      baseDir: 'client',
      index: 'index.html',
      middleware: [historyApiFallback()],
      routes: {
        "/xyz-player-component": "xyz-player-component",
        "/stream/xyz-player-component": "xyz-player-component",
        "/stream/xyz-player-component/css": "xyz-player-component/css",
        "/stream": "stream"
      }
    },
    ui: {
      port: 9006
    },
    port: 9005
  })
});

gulp.task('browserSync:dist', function () {
  browserSync({
    server: {
      baseDir: 'dist',
      index: 'index.html',
      middleware: [historyApiFallback()]
    },
    port: 9000
  })
});

gulp.task('trybuild', function (callback) {
  runSequence('build', 'browserSync:dist', callback);
});


gulp.task('browserSync:stream', function () {
  browserSync({
    server: {
      baseDir: 'stream',
      index: 'index.html',
      middleware: [historyApiFallback()],
      routes: {
        "/xyz-player-component": "xyz-player-component",
        "/stream": "stream"
      }
    },
    port: 9001
  })
});


gulp.task('build', function (callback) {
  runSequence('clean', 'loopback', 'sass', 'bower',
    ['useref:main', 'copyHtml:main', 'copyImages'], ['useref:stream', 'copyCss:stream'],
    callback
  )
});

gulp.task('default', function (callback) {
  runSequence('serve', callback)
});

gulp.task('serve', function (callback) {
  apiUrl = 'http://localhost' + ':' + constants.api.port + constants.api.path + '/';
  runSequence(['loopback', 'bower', 'sass', 'browserSync:client', 'watch'],
    callback
  )
});


gulp.task('watchStream', ['browserSync:stream', 'sass'], function () {
  gulp.watch('stream/scss/**/*.scss', ['sass']);
  gulp.watch([
    'stream/*.html',
    'stream/style.css',
    'stream/views/**/*.html',
    'stream/js/**/*.js'
  ], browserSync.reload);
});


gulp.task('stream', function (callback) {
  runSequence(['browserSync:stream', 'watchStream'],
    callback
  )
});


gulp.task('serveApi', function () {
  nodemon({
    script: 'server/server.js',
    ext: 'js json html jade',
    ignore: 'client/*',
    env: {'NODE_ENV': 'development'}
  })
});


gulp.task('docs', function () {
  runSequence('loopback','generate-docs', 'serve-docs', 'open-docs');
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

gulp.task('serve-docs', function () {
  connect.server({
    root: 'docs',
    livereload: false,
    fallback: 'docs/index.html',
    port: 8888
  })
});
gulp.task('open-docs', function(){
  return gulp.src('').pipe(
    open({uri: 'http://localhost:8888'})
  );
});

gulp.task('copy-staging-db', function(){
  runSequence('save-db','overwrite-db-local');
});

gulp.task('save-db', function(done){
  var hostColonPort = [mongoCreds.hosts[0].host,mongoCreds.hosts[0].port].join(':');
  var command = 'mongodump -h '+hostColonPort+' -d '+mongoCreds.database+' -u '+mongoCreds.username+' -p '+mongoCreds.password+ ' -o xyzDbDump';
  return gulp.src('')
      .pipe(exec(command),function cb(err, stdout, stderr) {
        console.log(stdout); // outputs the normal messages
        console.log(stderr); // outputs the error messages
        done();
//        return 0; // makes gulp continue even if the command failed
    })
    .pipe(exec.reporter())
});
gulp.task('overwrite-db-local', function(done){
  var command = 'mongorestore --drop --host=127.0.0.1:27017 -d xyz xyzDbDump/'+mongoCreds.database;
    return gulp.src('')
      .pipe(exec(command),function cb(err, stdout, stderr) {
        console.log(stdout); // outputs the normal messages
        console.log(stderr); // outputs the error messages
        done();
//        return 0; // makes gulp continue even if the command failed
    })
    .pipe(exec.reporter())
});
