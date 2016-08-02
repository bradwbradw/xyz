# xyz2

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.12.1.

## Build & development


##STEP 0

get set up with npm, gulp

##STEP 1

in terminal, run: `node server/server.js`

##STEP 2

in another terminal, run: `gulp serve`

## OPTIONS

for Step 1, you can supply an environment variable as such:

`MONGODB_URL=mongodb://localhost node server/server.js`

^ this will connect to the local mongo database. (default is to connect to the staging database - the one at https://xxxyyyzzz.herokuapp.com/)

##notes

###api call to get playlist from a space:

`/api/spaces/playlist?spaceId=1234`

###/stream/index.html

serves up the static site for stream embedding.  
use '#?playlist=129994120' to set the id of the space you want


## Testing

Running `gulp test` will run the unit tests with karma.


## testing the api

first install jasmine-node:

`npm install -g jasmine-node`

then run with:

`jasmine-node api-test`

##Documentation

all data models should be automatically generated with documentation using loopback.

Including getters, setters, querying, etc.

`gulp docs` will generate docs, docs server, and then open it up in the browser

##Download staging db

`gulp copy-staging-db` will download the staging server database and overwrite your local version with it
