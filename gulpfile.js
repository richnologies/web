var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var args = require('yargs').argv;
var del = require('del');
var sequence = require('run-sequence');

var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('help', $.taskListing);

gulp.task('default', ['help']);

/**
 * Bump the version
 * --type=pre will bump the prerelease version *.*.*-x
 * --type=patch or no flag will bump the patch version *.*.x
 * --type=minor will bump the minor version *.x.*
 * --type=major will bump the major version x.*.*
 * --version=1.2.3 will bump to a specific version and ignore other flags
 */
gulp.task('bump', function() {
  var type = args.type;
  var version = args.version;
  var options = {};
  if (version) {
    options.version = version;
  } else {
    options.type = type;
  }
  return gulp
    .src([
      './package.json',
      './bower.json'
    ])
    .pipe($.bump(options))
    .pipe(gulp.dest('./'));
});

// RUN TASKS ------------------------------------------------------------------
gulp.task('run', function(done) {
  if (args.build) {
    sequence(
      ['build-server', 'build-client'],
      'run-server',
      'run-watchers',
      done);
  } else {
    sequence(
      'run-server',
      'run-watchers',
      done);
  }
});

gulp.task('run-server', function() {
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT: 3000,
      DEBUG: true
    },
    ignore: [
      './node_modules/**',
      './src',
      './public',
      '.eslintrc.js',
      'gulpfile.js'
    ]
  })
  .on('restart', () => console.log('server restarting...'));
});

gulp.task('run-watchers', function() {
  gulp.watch('./src/**', ['build-server']);
});

// BUILD TASKS ----------------------------------------------------------------

// ---- Assets
gulp.task('build-client', function(done) {
  sequence(
    [
      'clean-client-css',
      'clean-client-fonts',
      'clean-client-img',
      'clean-client-js',
      'clean-client-libs'
    ],
    [
      'client-css',
      'client-fonts',
      'client-img',
      'client-js',
      'client-libs'
    ],
    done);
});

gulp.task('client-css', function() {
  return gulp.src('./src/client/css/**')
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('client-fonts', function() {
  return gulp.src('./src/client/font/**')
    .pipe(gulp.dest('./public/font/'));
});

gulp.task('client-img', function() {
  return gulp.src('./src/client/img/**')
    .pipe(gulp.dest('./public/img/'));
});

gulp.task('client-js', function() {
  return gulp.src('./src/client/js/**')
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('client-libs', function() {
  return gulp.src('./src/client/libs/**')
    .pipe(gulp.dest('./public/libs/'));
});

// Server
gulp.task('build-server', function(done) {
  sequence(
    [
      'clean-main-app',
      'clean-server-routes',
      'clean-server-templates'
    ],
    [
      'main-app',
      'server-routes',
      'server-templates'
    ],
    done);
});

gulp.task('main-app', function() {
  return gulp.src('./src/app.server.js')
    .pipe($.rename('app.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('server-routes', function() {
  return gulp.src('./src/server/**/*.js')
    .pipe(gulp.dest('./build/'));
});

gulp.task('server-templates', function() {
  return gulp.src('./src/templates/**/*.ejs')
    .pipe(gulp.dest('./views/'));
});

// CLEAN TASKS ----------------------------------------------------------------

// ---- Assets
gulp.task('clean-client-img', function(done) {
  del('./public/img/').then(() => done());
});

gulp.task('clean-client-fonts', function(done) {
  del('./public/font/').then(() => done());
});

gulp.task('clean-client-css', function(done) {
  del('./public/css/').then(() => done());
});

gulp.task('clean-client-js', function(done) {
  del('./public/js/').then(() => done());
});

gulp.task('clean-client-libs', function(done) {
  del('./public/libs/').then(() => done());
});

// Server
gulp.task('clean-main-app', function(done) {
  del('./app.js').then(() => done());
});

gulp.task('clean-server-routes', function(done) {
  del('./build/').then(() => done());
});

gulp.task('clean-server-templates', function(done) {
  del('./views/').then(() => done());
});
