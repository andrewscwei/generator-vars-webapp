/* jshint strict:false */
/**
 *  <%= appname %><% if (appauthor !== '' || appauthoremail !== '') { %>
 *  (c)<% if (appauthor !== '') { %> <%= appauthor %><% } %><% if (appauthoremail !== '') { %> <<%= appauthoremail %>><% } %><% } %>
 *
 *  Processes all template files (i.e. HTML) and deploys them to the /<%= paths.tmp %> directory.
 *
 *  @param {Boolean} debug
 *  @param {Boolean} skip-minify-html
 */

var config = require('./config');
var gulp = require('gulp');
var $fileInclude = require('gulp-file-include');

gulp.task('templates', function()
{
    return gulp.src([config.paths.src+'/**/*.'+config.patterns.templates])
        .pipe($fileInclude({
            prefix: '@@',
            basepath: config.paths.src+'/'
        }))
        .pipe(gulp.dest(config.paths.tmp));
});
