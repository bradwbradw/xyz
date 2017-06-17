# xyz2

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.12.1.

## Build & development

##0) INITIAL ( you should do this to set up your environment once, then you never have to repeat )

- get set up with node using nvm (if you currently use `sudo` to run npm commands, please reinstall node using `nvm` so that you don't run node as root user).  Follow instructions at https://github.com/creationix/nvm

- install mongoDb locally (recommended but not necessary, see note in "OPTIONS" section below )
 (https://www.mongodb.com/download-center#community)
 
 - clone this repository. the action of cloning creates a new directory and installs into that.  This directory is now the Root directory of local version of the repository. Execute all terminal commands from inside this new folder
`git clone https://github.com/bradwbradw/xyz`
 
- after installing `nvm` and cloning the repo, you have to install some node modules globally, so run these commands from inside this project's root directory:

`nvm use`

`npm install gulp-cli -g` <-- may actually have to repeat if the node version changes

`npm install nodemon -g` <-- may actually have to repeat if the node version changes

##1) BUILD (repeat these steps if you have closed your terminal windows)
This step will: A) compile the app's views and javascript to make the distribution version of the app, and B) set up the backend server so that the distribution AND the development versions can make requests to the api

`nvm use`

`npm install` <-- only necessary if the file `package.json` has changed since you last ran this command

`./dev.sh`

At this point the app is built and ready to browse and run tests, but the development flow is not set up (you have to build every time you make a code change). To view the app, go to `http://localhost:5005`.  you can also explore the api at `http://localhost:5005/explorer`


##2) DEVELOP (repeat these steps if you have closed your terminal windows and want to work on any code)

(open a new terminal window)

`nvm use`

`gulp`

At this point the development version of the app can be loaded at `http://localhost:9005`, and any time you edit a file, any browsers that have the page loaded should refresh automatically


## ERRORS! 

- the first thing to try when an error occurs in the terminal (or possibly in the browser console) is to reinstall node modules then try whatever you were doing one more time.   To do this, first, ensure that the terminal window is using the right version of node by running `nvm use`.  The output should say this (or something similar):

```
Found '/path/to/xyz/.nvmrc' with version <lts/boron>
Now using node v6.9.1 (npm v3.10.8)
```

To nuke the modules and re-install (this is safe) do `rm -rf node_modules/` (or just delete the folder "node_modules" using Finder), then do `npm install`.  

- For the error: `Failed to read /Users/brad/Sites/xyz/client/vendor/angular-sanitize/.bower.json (or similar)` the solution
is to simply delete the contents of "vendor" folder and then run `gulp bower` to re-download the clientside dependencies into there

- If when running gulp commands you get `TypeError: Cannot read property 'apply' of undefined`, then reinstall gulp-cli:
`npm install -g gulp-cli`

TODO Add more possible errors + workarounds here

## OPTIONS

### connect to a specific database
for Step 1, you can supply an environment variable as such, to connect to a specific mongo database

`MONGODB_URL=DB_URL ./dev.sh`

( the default is to connect to your local database )

You can use the staging database URL if you are unable to install mongo locally
```
mongodb://heroku_cc7gbkr1:rusl214k9b95o5d7evobgufue6@ds059135.mongolab.com:59135/heroku_cc7gbkr1
```

### develop using external ip (good for testing mobile devices)

BrowserSync will allow you to load the site using an external ip. It shows what this ip address is when starting `gulp serve`.  The problem is that some of the api calls would still go to `localhost`.  Unless you have port forwarding set up, this will prevent api calls from executing.

You can solve this by setting the `IP` environment variable to whatever browserSync is using:

```
IP=192.168.0.11 gulp serve
```

TIP: in the console, you will see a line that looks like:
```
Generating lbServices for the API endpoint http://localhost:5005/api//
```

make sure it shows the correct ip address that you specified.  If it doesn't, run: 

```
IP=192.168... gulp loopback
```
and then run the `serve` command



##notes


###recipe for committing updates to models since 'gulp loopback' task broke:
- run gulp loopback, when done, hit ctrl-c
- modify scripts/lb-services.js so that the immediately invoked function
- takes window.API_BASE_URL as third parameter (second pair of brackets)
- and in the first pair of brackets, replace undefined with urlBase
- comment out "var urlBase = ... " on line 16
- commit changes to lb-services.js

###api call to get playlist from a space:

`/api/spaces/playlist?spaceId=1234`

###/stream/index.html

serves up the static site for stream embedding.  
use '#?playlist=129994120' to set the id of the space you want


## Testing

### end-to-end tests

- 1) please ensure the local test data matches up with what is in the wiki (https://github.com/bradwbradw/xyz/wiki/Test-data-rules)

- 2) start server by doing command: `./dev.sh` (or ensure server is already running)
  
- 3) open a new terminal tab, and do `gulp webdriver`.  you should see the webdriver update and then start. You might also see  "Selenium is already running on port 4444. Or some other service is." which means it has started, so you can proceed to step 4

- 4) open a new terminal tab, and do `gulp e2e-test`. This command should cause a browser window to open, and the test scripts will run

If you are adding to the test scripts, check out http://www.protractortest.org/#/api to see what commands you can call.

### unit tests
tba

### testing the api

first install jasmine-node:

`npm install -g jasmine-node`

then run with:

`jasmine-node api-test`

##Debug
serverside activity can be debugged as per https://docs.strongloop.com/display/public/LB/Setting+debug+strings

##Documentation

all data models should be automatically generated with documentation using loopback.

Including getters, setters, querying, etc.

`gulp docs` will generate docs, docs server, and then open it up in the browser

##Download staging db

`gulp copy-staging-db` will download the staging server database and overwrite your local version with it
