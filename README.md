# generator-vars-webapp

VARIANTE's Yeoman generator for a raw front-end web app.

## Features

- [Bower](http://bower.io)
- [Gulp](http://gulpjs.com) setup for CSS, JavaScript, and HTML minification as well as static asset revisioning (appending content hash to filenames)
- [BrowserSync](http://www.browsersync.io) for rapid development
- [Sass](http://sass-lang.com)/[Stylus](https://learnboost.github.io/stylus/) with Scalable and Modular Architecture (SMACSS) setup
- templating using ```gulp-file-include```
- [Browserify](http://browserify.org) with Babelify and Watchify

## Libraries

- Bootstrap (optional)
- Modernizr (optional)
- jQuery

## Structure

```
.
+-- .bowerrc
+-- .editorconfig
+-- .gitattributes
+-- .gitignore
+-- .jshintrc
+-- app
|   +-- .htaccess
|   +-- .jshintrc
|   +-- fonts
|   +-- images
|   |   +-- apple-touch-icon-57x57.png
|   |   +-- apple-touch-icon-72x72.png
|   |   +-- apple-touch-icon-114x114.png
|   |   +-- apple-touch-icon.png
|   |   +-- favico.png
|   |   +-- og-image.png
|   +-- scripts
|   |   +-- main.js
|   +-- styles
|   |   +-- base
|   |   |   +-- definitions.{scss,styl}
|   |   |   +-- layout.{css,scss,styl}
|   |   |   +-- normalize.{css,scss,styl}
|   |   |   +-- typography.{css,scss,styl}
|   |   +-- components
|   |   +-- modules
|   |   +-- main.{scss,styl}
|   +-- videos
|   +-- 404.html
|   +-- favico.ico
|   +-- index.html
|   +-- README.md
|   +-- robots.txt
+-- public // runtime files go here
+-- bower_components
+-- node_modules
+-- tasks
|   +-- .jshintrc
|   +-- .taskconfig
|   +-- build.js
|   +-- clean.js
|   +-- serve.js
|   +-- wiredep.js
+-- test
|   +-- bower_components
|   +-- spec
|   +-- index.html
|   +-- bower.json
+-- gulpfile.js
+-- bower.json
+-- package.json
```

## Tasks

```gulp build --debug```: Builds all source files in the ```app``` directory but skips all compression tasks.

```gulp build```: Builds all source fies in the ```app``` directory with asset compression such as CSS/HTML/JavaScript minification and deploys them to the ```build``` directory.

```gulp serve --debug --watch```: Serves the ```.tmp``` directory to ```localhost``` and immediately watches source files for changes. Any change in the source files will invoke its corresponding build tasks. This is great for debugging.

```gulp serve```: Serves the ```build``` directory to ```localhost```.

See ```tasks/.taskconfig``` for more tasks and custom flags such as ```--skip-js-min```, ```--skip-css-min```, etc.

## Usage

Install ```yo```:
```
npm install -g yo
```

Install ```generator-vars-webapp```:
```
npm install -g generator-vars-webapp
```

Create a new directory for your project and ```cd``` into it:
```
mkdir new-project-name && cd $_
```

Generate the project:
```
yo vars-webapp [app-name]
```

For details on initial setup procedures of the project, see its generated ```README.md``` file.

## Release Notes

### 2.0.0
1. Updated version numbers of NPM package dependencies.
2. Gulp tasks are now compressed into fewer files. As a result `require-dir` dependency is no longer necessary and is removed from `package.json`.
3. Task configurations are now stored in `./tasks/.taskconfig`.
4. `favicon.png`, Apple touch and Open Graph specific icons are now moved to `app/images`. `favicon.ico` remains in the root directory.
5. `gulp-imagemin` is removed because it is the most taxing task in the Gulp pipeline. Images should be optimized outside of the Gulp pipeline instead.
6. Runtime files are now deployed to `./public` instead of `./build`.
6. Minor syntactic sugar changes.
7. Lots of optimizations, particularly boosting the efficiency of automated rebuilds during development.

## License

This software is released under the [MIT License](http://opensource.org/licenses/MIT).
