/* jshint strict:false */
/**
 *  <%= appname %><% if (appauthor !== '' || appauthoremail !== '') { %>
 *  (c)<% if (appauthor !== '') { %> <%= appauthor %><% } %><% if (appauthoremail !== '') { %> <<%= appauthoremail %>><% } %><% } %>
 *
 * 	Builds the entire app from /<%= paths.src %> -> /<%= paths.tmp %> -> /<%= paths.build %>. Version hash is appended to file names here
 * 	if enabled. HTML minification is also done here.
 *
 *  @param {Boolean} debug
 *  @param {Boolean} skip-csso
 *  @param {Boolean} skip-minify-html
 *  @param {Boolean} skip-rev
 *  @param {Boolean} skip-uglify
 */

var config = require('./config');
var gulp = require('gulp');
var $csso = require('gulp-csso');
var $if = require('gulp-if');
var $minifyHTML = require('gulp-minify-html');
var $rev = require('gulp-rev');
var $revReplace = require('gulp-rev-replace');
var $size = require('gulp-size');
var $uglify = require('gulp-uglify');
var $useref = require('gulp-useref');
var $util = require('gulp-util');

gulp.task('build', ['static', 'templates'], function()
{
    var assets = $useref.assets({searchPath: [config.paths.tmp, '.']});

    return gulp.src([config.paths.tmp+'/**/*.'+config.patterns.templates])
        .pipe(assets)
        .pipe($if(!config.env.skipCSSO, $if('*.css', $csso())))
        .pipe($if(!config.env.skipUglify, $if('*.js', $uglify()))).on('error', $util.log)
        .pipe($if(!config.env.skipRev, $rev()))
        .pipe(assets.restore())
        .pipe($useref())
        .pipe($if(!config.env.skipRev, $revReplace()))
        .pipe($if(!config.env.skipMinifyHTML, $if('*.html', $minifyHTML({empty: true, conditionals: true, loose: true }))))
        .pipe(gulp.dest(config.paths.build))
        .pipe($size({ title: 'build', gzip: true }));
});
