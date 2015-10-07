/**
 *  <%= appname %><% if (appauthor !== '' || appauthoremail !== '') { %>
 *  (c)<% if (appauthor !== '') { %> <%= appauthor %><% } %><% if (appauthoremail !== '') { %> <<%= appauthoremail %>><% } %><% } %>
 */

var config = require('./.taskconfig');
var gulp = require('gulp');
var wiredep = require('wiredep').stream;

/**
 * Injects Bower components into template files.
 */
gulp.task('wiredep', function()
{
  gulp.src(config.wiredep.entry)
    .pipe(wiredep(config.wiredep.wiredep))
    .pipe(gulp.dest(config.wiredep.output));
});
