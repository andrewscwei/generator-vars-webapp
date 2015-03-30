#<%= appname %>
This project is scaffolded by [Yeoman](http://yeoman.io). See [generator-vars-webapp](https://github.com/VARIANTE/generator-vars-webapp.git) for more details.

##Usage
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
$ gulp build --debug
$ gulp serve --debug
```

Visit ```localhost:9000``` in browser; by default you should see 'Hello, World!'.

Test prod environment:
```
$ gulp build
$ gulp serve
```

Visit ```localhost:9000``` in browser; by default you should see 'Hello, World!'.

##Tasks
```gulp build --debug```: Builds all source files in the ```app``` directory but skips all compression tasks.

```gulp build```: Builds all source fies in the ```app``` directory with asset compression such as CSS/HTML/JavaScript minification and deploys them to the ```build``` directory.

```gulp serve --debug```: Serves the ```.tmp``` directory to ```localhost``` and immediately watches source files for changes. Any change in the source files will invoke its corresponding build tasks. This is great for debugging.

```gulp serve```: Serves the ```build``` directory to ```localhost``` and immediately watches source files for changes. Any change in the source files will invoke a ```gulp build```. This command is not meant for debugging purposes and is for production testing only.

See ```gulpfile.js``` for more tasks and custom flags such as ```--skip-uglify```, ```--skip-csso```, etc.

##Cloud Setup (Linux)
###Updating APT Packages
```
$ sudo apt-get update
```

###Installing ```git```
```
$ sudo apt-get install git-core
```

###Installing ```nvm```/```node```/```npm``` Globally

Install dependencies:
```
$ sudo apt-get install build-essential openssl libssl-dev curl
```

Clone ```nvm``` repo:
```
$ sudo git clone https://github.com/creationix/nvm.git /opt/nvm
```

Create directories where ```nvm``` and ```node``` will be globally installed to:
```
$ sudo mkdir /usr/local/nvm
$ sudo mkdir /usr/local/node
```

Change the permissions of the newly created directories so you can write to it when you install ```node```:
```
$ sudo chown -R your_admin_user_name /usr/local/nvm
$ sudo chmod -R 775 /usr/local/nvm
$ sudo chown -R your_admin_user_name /usr/local/node
$ sudo chmod -R 775 /usr/local/node
```

Create ```nvm.sh``` to be executed everytime the shell loads up:
```
$ sudo touch /etc/profile.d/nvm.sh
```

Add the following to ```nvm.sh```:
```
export NVM_DIR=/usr/local/nvm
source /opt/nvm/nvm.sh
export NPM_CONFIG_PREFIX=/usr/local/node
export PATH="/usr/local/node/bin:$PATH"
```

Log out and log back in or ```source``` the file so changes can take effect:
```
$ source /etc/profile.d/nvm.sh
```

Install preferred ```node``` version:
```
$ nvm install x.xx.x
```

Set ```node``` version as default so shell can remember it the next time you log in:
```
$ nvm alias default x.xx.x
```

###Serving with Nginx
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

##Common Issues
1. If ```gulp-watch``` is giving ```Bus error: 10```, try updating ```node``` (v0.12.0 seems to be ok).

##License
This software is released under the [MIT License](http://opensource.org/licenses/MIT).
