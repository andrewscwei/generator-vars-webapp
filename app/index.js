/**
 *  generator-vars-webapp
 *  (c) VARIANTE <http://variante.io>
 *
 *  This software is released under the MIT License:
 *  http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

// Import dependencies.
var fs = require('fs');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var wiredep = require('wiredep');

/**
 * @module
 * Extend base Yeoman generator.
 */
module.exports = yeoman.generators.Base.extend({

/**
 * Constructor.
 */
constructor: function()
{
    yeoman.generators.Base.apply(this, arguments);

    this.argument('projectname', { type: String, required: false });
    this.appname = this.projectname || this.appname;

    this.option('test-framework',
    {
        desc: 'Test framework to be invoked',
        type: String,
        defaults: 'mocha'
    });

    this.option('skip-welcome-message',
    {
        desc: 'Skips the welcome message',
        type: Boolean
    });

    this.option('skip-install',
    {
        desc: 'Skips the installation of dependencies',
        type: Boolean
    });

    this.option('skip-install-message',
    {
        desc: 'Skips the message after the installation of dependencies',
        type: Boolean
    });
},

/**
 * Initializes the generator instance and sets up all instance properties.
 */
initializing: function()
{
    this.pkg = require('../package.json');
    this.paths =
    {
        src: 'app',
        build: 'build',
        tmp: '.tmp'
    };
},

/**
 * Displays welcome message.
 */
welcoming: function()
{
    var done = this.async();

    if (!this.options['skip-welcome-message'])
    {
        this.log(yosay('\'Allo \'allo! Out of the box I include jQuery and a gulpfile.js to build your app.'));
    }

    var prompts =
    [
        {
            type: 'input',
            name: 'appauthor',
            message: 'Who is the author? (this will appear in the header of your source files)'
        },
        {
            type: 'input',
            name: 'appauthoremail',
            message: 'What is your email? (this will appear in the header of your source files)'
        }
    ];

    this.prompt(prompts, function(answers)
    {
        this.appauthor = answers.appauthor;
        this.appauthoremail = answers.appauthoremail;

        done();
    }.bind(this));
},

/**
 * Prompts the user to decide preferred CSS preprocessor.
 */
prompting1: function()
{
    var done = this.async();

    var prompts =
    [
        {
            type: 'checkbox',
            name: 'features',
            message: 'Which CSS preprocessor do you prefer? (select 1 or none)',
            choices:
            [
                {
                    name: 'Sass',
                    value: 'includeSass',
                    checked: true
                },
                {
                    name: 'Stylus',
                    value: 'includeStylus',
                    checked: false
                }
            ]
        }
    ];

    this.prompt(prompts, function(answers)
    {
        var features = answers.features;

        var hasFeature = function(feat)
        {
            return features.indexOf(feat) !== -1;
        };

        this.includeStylus = hasFeature('includeStylus');
        this.includeSass = hasFeature('includeSass');

        if (this.includeStylus && this.includeSass)
        {
            this.env.error('Please select either Stylus or Sass (or neither for vanilla CSS).');
        }
        else
        {
            done();
        }
    }.bind(this));
},

/**
 * Prompts the user for other preferred features.
 */
prompting2: function()
{
    var done = this.async();

    var prompts =
    [
        {
            type: 'checkbox',
            name: 'features',
            message: 'What more would you like?',
            choices:
            [
                {
                    name: 'Browserify',
                    value: 'includeBrowserify',
                    checked: true
                },
                {
                    name: 'Bootstrap',
                    value: 'includeBootstrap',
                    checked: false
                },
                {
                    name: 'Modernizr',
                    value: 'includeModernizr',
                    checked: true
                },
                {
                    name: 'Sublime',
                    value: 'includeSublime',
                    checked: true
                },
            ]
        }
    ];

    this.prompt(prompts, function(answers)
    {
        var features = answers.features;

        var hasFeature = function(feat)
        {
            return features.indexOf(feat) !== -1;
        };

        this.includeBrowserify = hasFeature('includeBrowserify');
        this.includeBootstrap = hasFeature('includeBootstrap');
        this.includeModernizr = hasFeature('includeModernizr');
        this.includeSublime = hasFeature('includeSublime');

        done();
    }.bind(this));
},

/**
 * Writes project files to destination.
 */
writing:
{
    sublime: function()
    {
        if (this.includeSublime)
        {
            this.template('sublime-project', this.appname + '.sublime-project');
        }
    },

    gulpfile: function()
    {
        this.template('gulpfile.js');
    },

    package: function()
    {
        this.template('package.json', 'package.json');
    },

    git: function()
    {
        this.copy('gitignore', '.gitignore');
        this.copy('gitattributes', '.gitattributes');
    },

    bower: function()
    {
        this.copy('bowerrc', '.bowerrc');
        this.template('bower.json', 'bower.json');
    },

    jshint: function()
    {
        this.copy('jshintrc', '.jshintrc');
    },

    editorConfig: function()
    {
        this.copy('editorconfig', '.editorconfig');
    },

    readme: function()
    {
        this.template('README.md', 'README.md');
    },

    config: function()
    {
        this.copy('robots.txt', this.paths.src+'/robots.txt');
        this.copy('htaccess', this.paths.src+'/.htaccess');
    },

    images: function()
    {
        this.mkdir(this.paths.src+'/images');
        this.copy('favicon.ico', this.paths.src+'/favicon.ico');
        this.copy('favicon.png', this.paths.src+'/favicon.png');
        this.copy('apple-touch-icon-57x57.png', this.paths.src+'/apple-touch-icon-57x57.png');
        this.copy('apple-touch-icon-72x72.png', this.paths.src+'/apple-touch-icon-72x72.png');
        this.copy('apple-touch-icon-114x114.png', this.paths.src+'/apple-touch-icon-114x114.png');
        this.copy('apple-touch-icon.png', this.paths.src+'/apple-touch-icon.png');
        this.copy('og-image.png', this.paths.src+'/og-image.png');
    },

    styles: function()
    {
        this.mkdir(this.paths.src+'/styles');
        this.mkdir(this.paths.src+'/styles/base');
        this.mkdir(this.paths.src+'/styles/components');
        this.mkdir(this.paths.src+'/styles/modules');

        var ext = '.' + ((this.includeStylus) ? 'styl' : ((this.includeSass) ? 'scss' : 'css'));

        if (this.includeSass || this.includeStylus) this.template('styles/main'+ext, this.paths.src+'/styles/main'+ext);
        this.template('styles/base/normalize'+ext, this.paths.src+'/styles/base/normalize'+ext);
        this.template('styles/base/typography'+ext, this.paths.src+'/styles/base/typography'+ext);
        this.template('styles/base/layout'+ext, this.paths.src+'/styles/base/layout'+ext);
    },

    scripts: function()
    {
        this.mkdir(this.paths.src+'/scripts');
        this.template('scripts/main.js', this.paths.src+'/scripts/main.js');
    },

    templates: function()
    {
        this.copy('404.html', this.paths.src+'/404.html');

        this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
        this.indexFile = this.engine(this.indexFile, this);

        // Wire Bootstrap plugins.
        if (this.includeBootstrap && !this.includeBrowserify)
        {
            var bs = 'bower_components/';

            if (this.includeSass)
            {
                bs += 'bootstrap-sass-official/assets/javascripts/bootstrap/';
            }
            else
            {
                bs += 'bootstrap/js/';
            }

            this.indexFile = this.appendScripts(this.indexFile, 'scripts/plugins.js',
                [
                    bs + 'affix.js',
                    bs + 'alert.js',
                    bs + 'dropdown.js',
                    bs + 'tooltip.js',
                    bs + 'modal.js',
                    bs + 'transition.js',
                    bs + 'button.js',
                    bs + 'popover.js',
                    bs + 'carousel.js',
                    bs + 'scrollspy.js',
                    bs + 'collapse.js',
                    bs + 'tab.js'
                ]);
        }

        this.indexFile = this.appendFiles
        (
            {
                html: this.indexFile,
                fileType: 'js',
                optimizedPath: 'scripts/main.js',
                sourceFileList: ['scripts/main.js']
            }
        );

        this.write(this.paths.src+'/index.html', this.indexFile);
    }
},

/**
 * Performs npm/bower installations.
 */
install: function()
{
    if (this.options['skip-install'])
    {
        this.log('\nAfter running ' + chalk.yellow.bold('npm install & bower install') + ', inject your front-end dependencies by running ' + chalk.yellow.bold('gulp wiredep') + '.');

        return;
    }

    this.installDependencies(
    {
        skipMessage: this.options['skip-install-message'],
        skipInstall: this.options['skip-install']
    });

    this.on('end', function()
    {
        if (!this.includeBrowserify)
        {
            var bowerJson = this.dest.readJSON('bower.json');
            var excludes = ['modernizr', 'bootstrap-sass', 'bootstrap.js'];

            if (this.includeSass || this.includeStylus)
            {
                excludes.push('bootstrap.css');
            }

            // Wire Bower packages to .html.
            wiredep(
            {
                bowerJson: bowerJson,
                directory: 'bower_components',
                exclude: excludes,
                ignorePath: /^(\.\.\/)*\.\./,
                src: this.paths.src+'/**/*.{html,shtml,htm,html.erb,asp,php}'
            });
        }

        // Ideally we should use composeWith, but we're invoking it here
        // because generator-mocha is changing the working directory
        // https://github.com/yeoman/generator-mocha/issues/28.
        this.invoke(this.options['test-framework'],
        {
            options:
            {
                'skip-message': this.options['skip-install-message'],
                'skip-install': this.options['skip-install']
            }
        });
    }.bind(this));
}

});
