/* jshint strict:false */
/**
 *  <%= appname %><% if (appauthor !== '' || appauthoremail !== '') { %>
 *  (c)<% if (appauthor !== '') { %> <%= appauthor %><% } %><% if (appauthoremail !== '') { %> <<%= appauthoremail %>><% } %><% } %>
 *
 *  Compiles and deploys fonts to the /<%= paths.tmp %> directory.
 */

var config = require('./config');
var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');

gulp.task('fonts', function()
{
    gulp.src(mainBowerFiles({ filter: '**/*.'+config.patterns.fonts }).concat(config.paths.src+'/fonts/**/*'))
        .pipe(gulp.dest(config.paths.tmp+'/fonts'));
});
