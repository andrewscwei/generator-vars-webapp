# <%= appname %>

This project is scaffolded by [Yeoman](http://yeoman.io). See [generator-vars-webapp](https://github.com/VARIANTE/generator-vars-webapp.git) for more details.

## Usage

Install node modules if they are not already installed:
```
$ npm install
```

Install bower components if they are not already installed:
```
$ bower install
```

Test dev environment:
```
$ gulp --debug
```

Visit ```localhost:9000``` in browser; by default you should see 'Hello, World!'.

Test prod environment:
```
$ gulp
```

Visit ```localhost:9000``` in browser; by default you should see 'Hello, World!'.

## Tasks

```gulp build --debug```: Builds all source files in the ```<%= paths.src %>``` directory but skips all compression tasks.

```gulp build```: Builds all source files in the ```<%= paths.src %>``` directory with asset compression such as CSS/HTML/JavaScript minification and deploys them to the ```<%= paths.build %>``` directory.

```gulp serve --debug --watch```: Serves the ```<%= paths.tmp %>``` directory to ```localhost``` and immediately watches source files for changes. Any change in the source files will invoke its corresponding build tasks. This is great for debugging.

```gulp serve```: Serves the ```<%= paths.build %>``` directory to ```localhost```.

See ```gulpfile.js``` for more tasks and custom flags such as ```--skip-uglify```, ```--skip-csso```, etc.

## Cloud Setup (Linux)

### Updating APT Packages

```
$ sudo apt-get update
```

### Installing ```git```

```
$ sudo apt-get install git-core
```

### Installing ```nvm``` Globally

Install ```nvm``` (see [https://github.com/xtuple/nvm](https://github.com/xtuple/nvm)):
```
$ sudo wget -qO- https://raw.githubusercontent.com/xtuple/nvm/master/install.sh | sudo bash
```

Install preferred ```node``` version:
```
$ nvm install x.xx.x
```

### Serving with Nginx

Install Nginx:
```
$ sudo apt-get install nginx
```

Edit Nginx default config file and point the root to the project path:
```
$ sudo nano /etc/nginx/sites-available/default
```

Reload Nginx
```
$ sudo service nginx reload
```

Visit external IP of your VM instance. Voila.

## Common Issues

1. If ```gulp-watch``` is giving ```Bus error: 10```, try updating ```node``` (v0.12.0 seems to be ok).

## License

This software is released under the [MIT License](http://opensource.org/licenses/MIT).
