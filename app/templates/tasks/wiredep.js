/* jshint strict:false */
/**
 *  <%= appname %><% if (appauthor !== '' || appauthoremail !== '') { %>
 *  (c)<% if (appauthor !== '') { %> <%= appauthor %><% } %><% if (appauthoremail !== '') { %> <<%= appauthoremail %>><% } %><% } %>
 *
 *  Injects Bower components into template files.
 */

var config = require('./config');
var gulp = require('gulp');
var wiredep = require('wiredep').stream;

gulp.task('wiredep', function()
{

    gulp.src(config.paths.src+'/**/*.'+config.patterns.templates)
        .pipe(wiredep({
            exclude: [<% if (includeBootstrap) { %><% if (css == 'Stylus') { %>'bootstrap.css',<% } %><% if (css == 'Sass') {%>'bootstrap-sass-official'<% } else { %>'bootstrap.js'<% } %><% if (includeModernizr) { %>, <% } %><% } %><% if (includeModernizr) { %>'modernizr'<% } %>],
            directory: 'bower_components',
            ignorePath: /^(\.\.\/)*\.\./
        }))
        .pipe(gulp.dest(config.paths.src));
});
