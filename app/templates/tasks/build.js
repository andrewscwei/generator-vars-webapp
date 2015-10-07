/**
 * <%= appname %><% if (appauthor !== '' || appauthoremail !== '') { %>
 * (c)<% if (appauthor !== '') { %> <%= appauthor %><% } %><% if (appauthoremail !== '') { %> <<%= appauthoremail %>><% } %><% } %>
 */

var autoprefixer = require('autoprefixer-core');
var config = require('./.taskconfig');
var del = require('del');
var gulp = require('gulp');
var merge = require('merge-stream');
var $csso = require('gulp-csso');
var $fileInclude = require('gulp-file-include');
var $if = require('gulp-if');
var $minifyHTML = require('gulp-minify-html');
var $postcss = require('gulp-postcss');
var $rev = require('gulp-rev');
var $revReplace = require('gulp-rev-replace');<% if (css == 'Stylus') { %>
var $stylus = require('gulp-stylus');<% } else if (css == 'Sass') { %>
var $sass = require('gulp-sass');<% } %>
var $size = require('gulp-size');
var $sourcemaps = require('gulp-sourcemaps');
var $uglify = require('gulp-uglify');
var $useref = require('gulp-useref');
var $util = require('gulp-util');<% if (includeBrowserify) { %>
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var through2 = require('through2');
var watchify = require('watchify'); <% } else { %>
var $jshint = require('gulp-jshint');<% } %>

/**
 * Compiles and deploys images.
 *
 * @param {Boolean} debug
 */
gulp.task('images', function() {
  return gulp.src(config.images.entry)
    .pipe($size({
      title: '[images]',
      gzip: true
    }))
    .pipe(gulp.dest(config.images.output));
});

/**
 * Compiles and deploys videos.
 */
gulp.task('videos', function() {
  return gulp.src(config.videos.entry)
    .pipe($size({
      title: '[videos]',
      gzip: true
    }))
    .pipe(gulp.dest(config.videos.output));
});

/**
 * Compiles and deploys fonts.
 */
gulp.task('fonts', function() {
  return gulp.src(config.fonts.entry)
    .pipe($size({
      title: '[fonts]',
      gzip: true
    }))
    .pipe(gulp.dest(config.fonts.output));
});

/**
 * Compiles and deploys misc files.
 */
gulp.task('extras', function()
{
  return gulp.src(config.extras.entry, { dot: true })
    .pipe(gulp.dest(config.extras.output));
});

/**
 * Compiles and deploys stylesheets.
 *
 * @param {Boolean} css-sourcemaps
 * @param {Boolean} debug
 */
gulp.task('styles', function()
{
  return gulp.src(config.styles.entry)
    .pipe($if(config.env.cssSourcemaps, $sourcemaps.init()))<% if (css == 'Stylus') { %>
    .pipe($stylus(config.styles.stylus).on('error', function(err) {
      $util.log($util.colors.red('[stylus] error: ' + err.message));
      this.emit('end');
    }))<% } else if (css == 'Sass') { %>
    .pipe($sass(config.styles.sass).on('error', function(err) {
      $util.log($util.colors.red('[sass] error: ' + err.message));
      this.emit('end');
    }))<% } %>
    .pipe($postcss([autoprefixer(config.styles.autoprefixer)]))
    .pipe($if(config.env.cssSourcemaps, $sourcemaps.write()))
    .pipe($size({
      title: '[styles:app]',
      gzip: true
    }))
    .pipe(gulp.dest(config.styles.output));
});

/**
 * Compiles all JavaScript files.<% if (includeBrowserify) { %> This task assumes that all bundle files are located in /<%= paths.src %>/scripts
 * and ignores all sub-directories. Watchify is used to speed up the rebundling process when watch is enabled.
 * Babelify is used to allow development in ES6 standards.<% } %>
 *
 * @param {Boolean} debug
 * @param {Boolean} js-sourcemaps
 * @param {Boolean} watch
 */
gulp.task('scripts', function() {<% if (includeBrowserify) { %>
  function bundle(bundler, output, next) {
    return bundler.bundle()
    .on('error', function(err) {
      $util.log($util.colors.red('[browserify] Error: ' + err.message));

      if (next) {
        next();
      }
      else {
        this.emit('end');
      }
    })
    .pipe(source(output))
    .pipe(buffer())
    .pipe($if(config.env.jsSourcemaps, $sourcemaps.init({ loadMaps: true })))
    .pipe($if(config.env.jsSourcemaps, $sourcemaps.write('./')))
    .pipe(gulp.dest(config.scripts.output));
  }

  return gulp.src(config.scripts.entry)
    .pipe(through2.obj(function(file, enc, next) {
      var opts = {
        entries: [file.path],
        debug: config.debug,
        transform: [babelify]
      };
      var bundler = (config.env.watch) ? watchify(browserify(opts)) : browserify(opts);
      var output = file.path.replace(file.base, '');

      if (config.env.watch) {
        bundler.on('time', function(time) {
          $util.log($util.colors.green('[browserify]'), output, $util.colors.magenta('in ' + time + 'ms'));
        });

        bundler.on('update', function() {
          bundle(bundler, output);
        });
      }

      bundle(bundler, output, next)
        .on('end', function() {
          next(null, file);
        });
    }));<% } else { %>
  return gulp.src(config.scripts.entry)
    .pipe($jshint())
    .pipe($jshint.reporter('jshint-stylish'))
    .pipe($if(config.env.jsSourcemaps, $sourcemaps.init({ loadMaps: true })))
    .pipe($if(config.env.jsSourcemaps, $sourcemaps.write('./')))
    .pipe(gulp.dest(config.scripts.output));<% } %>
});

/**
 * Processes all static files (i.e. images, stylesheets, scripts, etc) and deploys them.
 *
 * @param {Boolean} css-sourcemaps
 * @param {Boolean} debug
 * @param {Boolean} js-sourcemaps
 * @param {Boolean} skip-css-min
 * @param {Boolean} skip-js-min
 * @param {Boolean} watch
 */
gulp.task('static', ['images', 'videos', 'fonts', 'extras', 'styles', 'scripts'], function() {
  return gulp.src(config.static.entry)
    .pipe(gulp.dest(config.static.output));
});

/**
 * Processes all template files (i.e. HTML) and deploys them.
 *
 * @param {Boolean} debug
 */
gulp.task('templates', function() {
  return gulp.src(config.templates.entry)
    .pipe($fileInclude(config.templates.fileInclude))
    .pipe($size({
      title: '[templates]',
      gzip: true
    }))
    .pipe(gulp.dest(config.templates.output));
});

/**
 * Builds the entire app with option to apply revisioning.
 *
 * @param {Boolean} debug
 * @param {Boolean} skip-css-min
 * @param {Boolean} skip-js-min
 * @param {Boolean} skip-rev
 */
gulp.task('build', ['static', 'templates'], function()
{
  var refs = $useref.assets(config.build.useref);

  return gulp.src(config.build.entry)
    .pipe(refs)
    .pipe($if(!config.env.skipCSSMin, $if('*.css', $csso())))
    .pipe($if(!config.env.skipJSMin, $if('*.js', $uglify()))).on('error', $util.log)
    .pipe($if(!config.env.skipRev, $rev()))
    .pipe(refs.restore())
    .pipe($useref())
    .pipe($if(!config.env.skipRev, $revReplace()))
    .pipe($if(!config.env.skipMinifyHTML, $if('*.html', $minifyHTML(config.build.minifyHTML))))
    .pipe(gulp.dest(config.build.output));
});
