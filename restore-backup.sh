mongoimport --host=127.0.0.1 --db xyz-prod --collection Space --file backups/production/Space.json;
mongoimport --host=127.0.0.1 --db xyz-prod --collection Song --file backups/production/Song.json;
mongoimport --host=127.0.0.1 --db xyz-prod --collection User --file backups/production/User.json;
mongoimport --host=127.0.0.1 --db xyz-prod --collection dj --file backups/production/dj.json;
