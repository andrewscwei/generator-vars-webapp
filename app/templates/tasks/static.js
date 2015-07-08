/* jshint strict:false */
/**
 *  <%= appname %><% if (appauthor !== '' || appauthoremail !== '') { %>
 *  (c)<% if (appauthor !== '') { %> <%= appauthor %><% } %><% if (appauthoremail !== '') { %> <<%= appauthoremail %>><% } %><% } %>
 *
 *  Processes all static files (i.e. images, stylesheets, scripts, etc) and deploys them to the /<%= paths.tmp %> directory.
 *  These static files are then deployed to the /<%= paths.build %> directory. Option to append version hash to the end
 *  of the supported files.
 *
 *  @param {Boolean} --debug
 */

var config = require('./config');
var gulp = require('gulp');

gulp.task('static', ['images', 'videos', 'fonts', 'styles', 'scripts', 'extras'], function()
{
    return gulp.src([config.paths.tmp+'/**/*.'+config.patterns.images, config.paths.tmp+'/**/*.'+config.patterns.videos, config.paths.tmp+'/**/*.'+config.patterns.fonts, config.paths.tmp+'/**/*.'+config.patterns.extras], { dot: true })
        .pipe(gulp.dest(config.paths.build));
});
