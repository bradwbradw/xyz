ssh -t dokku@ssh.xyz.gs mongodb:export xyz xyzdb Space > xyzDbDump/production/Space.json &&
ssh -t dokku@ssh.xyz.gs mongodb:export xyz xyzdb Song > xyzDbDump/production/Song.json &&
ssh -t dokku@ssh.xyz.gs mongodb:export xyz xyzdb SpaceSong > xyzDbDump/production/SpaceSong.json &&
ssh -t dokku@ssh.xyz.gs mongodb:export xyz xyzdb Spacedj > xyzDbDump/production/Spacedj.json &&
ssh -t dokku@ssh.xyz.gs mongodb:export xyz xyzdb dj > xyzDbDump/production/dj.json &&
ssh -t dokku@ssh.xyz.gs mongodb:export xyz xyzdb Role > xyzDbDump/production/Role.json &&
ssh -t dokku@ssh.xyz.gs mongodb:export xyz xyzdb RoleMapping > xyzDbDump/production/RoleMapping.json &&
ssh -t dokku@ssh.xyz.gs mongodb:export xyz xyzdb AccessToken > xyzDbDump/production/AccessToken.json