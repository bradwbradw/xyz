mkdir backups;
mkdir backups/production;
ssh -t dokku@ssh.xyz.gs mongodb:export xyz xyzdb Space > backups/production/Space.json &&
ssh -t dokku@ssh.xyz.gs mongodb:export xyz xyzdb Song > backups/production/Song.json &&
ssh -t dokku@ssh.xyz.gs mongodb:export xyz xyzdb SpaceSong > backups/production/SpaceSong.json &&
ssh -t dokku@ssh.xyz.gs mongodb:export xyz xyzdb Spacedj > backups/production/Spacedj.json &&
ssh -t dokku@ssh.xyz.gs mongodb:export xyz xyzdb dj > backups/production/dj.json &&
ssh -t dokku@ssh.xyz.gs mongodb:export xyz xyzdb Role > backups/production/Role.json &&
ssh -t dokku@ssh.xyz.gs mongodb:export xyz xyzdb RoleMapping > backups/production/RoleMapping.json &&
ssh -t dokku@ssh.xyz.gs mongodb:export xyz xyzdb AccessToken > backups/production/AccessToken.json