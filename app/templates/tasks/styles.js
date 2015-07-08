/* jshint strict:false */
/**
 *  <%= appname %><% if (appauthor !== '' || appauthoremail !== '') { %>
 *  (c)<% if (appauthor !== '') { %> <%= appauthor %><% } %><% if (appauthoremail !== '') { %> <<%= appauthoremail %>><% } %><% } %>
 *
 *  Compiles all stylesheets and deploys them to the /<%= paths.tmp %> directory.
 *
 *  @param {Boolean} debug
 */

var autoprefixer = require('autoprefixer-core');
var config = require('./config');
var gulp = require('gulp');
var $if = require('gulp-if');
var $postcss = require('gulp-postcss');<% if (css == 'Stylus') { %>
var $stylus = require('gulp-stylus');<% } else if (css == 'Sass') { %>
var $sass = require('gulp-sass');<% } %>
var $sourcemaps = require('gulp-sourcemaps');
var $util = require('gulp-util');

gulp.task('styles', function()
{
    return gulp.src([config.paths.src+'/**/*'+config.patterns.styles])
        .pipe($if(config.env.debug, $sourcemaps.init()))<% if (css == 'Stylus') { %>
        .pipe($stylus({
            'include css': true
        })
        .on('error', function(err)
        {
          $util.log($util.colors.red('Stylus error: ' + err.message));
          this.emit('end');
        }))<% } else if (css == 'Sass') { %>
        .pipe($sass({
            outputStyle: 'nested',
            includePaths: ['node_modules', config.paths.src+'/scripts']
        })
        .on('error', function(err)
        {
          $util.log($util.colors.red('Sass error: ' + err.message));
          this.emit('end');
        }))<% } %>
        .pipe($postcss([autoprefixer({ browsers: ['last 2 version', 'ie 9'] })]))
        .pipe($if(config.env.debug, $sourcemaps.write()))
        .pipe(gulp.dest(config.paths.tmp));
});
