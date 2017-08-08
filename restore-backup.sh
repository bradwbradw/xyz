#!/usr/bin/env bash
# WIP
mongoimport --host 127.0.0.1 --port 27017 --db xyz-restore -c Role backups/clean-sample/Role.json
