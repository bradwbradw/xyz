# xyz2

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.12.1.

## Build & development


##STEP 0

get set up with npm, gulp ( optional, but encouraged: mongo )

##STEP 1

in terminal, run: `./dev.sh`

##STEP 2

in another terminal window, run: `gulp`

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

You can solve this by setting the IP variable to whatever browserSync is using:

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

###api call to get playlist from a space:

`/api/spaces/playlist?spaceId=1234`

###/stream/index.html

serves up the static site for stream embedding.  
use '#?playlist=129994120' to set the id of the space you want


## Testing

### end-to-end tests

- 1) please edit `test/e2e-tests/protractor-config.js` to set your test email and password (don't commit that change)

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
