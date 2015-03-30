#generator-vars-webapp
VARIANTE's Yeoman generator for a raw front-end web app.

##Features
- ```node```
- ```bower```
- ```gulp``` setup for CSS, JavaScript, and HTML minification as well as static asset revisioning (appending content hash to filenames)
- ```browser-sync``` for rapid development
- Scalable and Modular Architecture for CSS (SMACSS) setup with CSS preprocessor Sass/Stylus (optional)
- Browserify (optional)
- Sublime project (optional)

##Libraries
- Bootstrap (optional)
- Modernizr (optional)
- jQuery

##Structure
```
.
+-- app
|   +-- styles
|   |   +-- base
|   |   |   +-- layout.{css,scss,styl}
|   |   |   +-- normalize.{css,scss,styl}
|   |   |   +-- typography.{css,scss,styl}
|   |   +-- components
|   |   +-- modules
|   |   +-- main.{scss,styl}
|   +-- images
|   +-- scripts
|   |   +-- main.js
|   +-- .htaccess
|   +-- apple-touch-icon-57x57.png
|   +-- apple-touch-icon-72x72.png
|   +-- apple-touch-icon-114x114.png
|   +-- apple-touch-icon.png
|   +-- favico.ico
|   +-- favico.png
|   +-- og-image.png
|   +-- 404.html
|   +-- index.html
|   +-- README.md
|   +-- robots.txt
+-- build
|   +-- runtime files
+-- bower_components
+-- node_modules
+-- test
|   +-- bower_components
|   +-- spec
|   +-- index.html
|   +-- bower.json
+-- .bowerrc
+-- .editorconfig
+-- .gitattributes
+-- .gitignore
+-- .jshintrc
+-- .yo-rc.json
+-- gulpfile.js
+-- bower.json
+-- package.json
```

##Tasks
```gulp build --debug```: Builds all source files in the ```app``` directory but skips all compression tasks.

```gulp build```: Builds all source fies in the ```app``` directory with asset compression such as CSS/HTML/JavaScript minification and deploys them to the ```build``` directory.

```gulp serve --debug```: Serves the ```.tmp``` directory to ```localhost``` and immediately watches source files for changes. Any change in the source files will invoke its corresponding build tasks. This is great for debugging.

```gulp serve```: Serves the ```build``` directory to ```localhost``` and immediately watches source files for changes. Any change in the source files will invoke a ```gulp build```. This command is not meant for debugging purposes and is for production testing only.

See ```gulpfile.js``` for more tasks and custom flags such as ```--skip-uglify```, ```--skip-csso```, etc.

##Usage
Install ```yo```
```
npm install -g yo
```

Clone this repo and symlink to npm (you may need ```sudo``` access)
```
git clone https://github.com/variante/generator-vars-webapp.git
cd generator-vars-webapp
npm link
```

Create a new directory for your project and ```cd``` into it
```
mkdir new-project-name && cd $_
```

Generate the project
```
yo vars-webapp
```

For details on initial setup procedures of the project, see its generated README.md file.

##License
This software is released under the [MIT License](http://opensource.org/licenses/MIT).
