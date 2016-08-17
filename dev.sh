#!/usr/bin/env bash

DEBUG=loopback:* MONGODB_URL=mongodb://localhost/xyz nodemon --watch server server/server.js