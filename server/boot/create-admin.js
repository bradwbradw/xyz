var _ = require('lodash');

var adminEmail = process.env.ADMIN_EMAIL;
var adminPass = process.env.ADMIN_PASS;

if (adminEmail && adminPass) {


  User.create([
    {username: 'bradmin', email: adminEmail, password: adminPass}
  ], function (err, users) {
    if (err) return debug('%j', err);

    Role.create({
      name: 'admin'
    }, function (err, role) {
      if (err) return debug(err);
      debug(role);

      // Make Bob an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: _.last(users).id
      }, function (err, principal) {
        if (err) return debug(err);
        debug(principal);
      });
    });
  });
}

