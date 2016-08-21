#!/usr/bin/env bash

export DEBUG=${DEBUG:-loopback:*}
export MONGODB_URL=${MONGODB_URL:-mongodb://localhost/xyz}

nodemon server/server.js