#!/usr/bin/env bash

# https://docs.strongloop.com/display/public/LB/Setting+debug+strings
# export DEBUG=${DEBUG:-loopback:*}
export MONGODB_URL=${MONGODB_URL:-mongodb://localhost/xyz}
export NODE_ENV=${NODE_ENV:-development}

node --inspect --debug-brk server/server.js