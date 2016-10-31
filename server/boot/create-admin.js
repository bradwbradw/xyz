var _ = require('lodash');

var adminEmail = process.env.CREATE_ADMIN_EMAIL;


module.exports = function (app) {

  if (adminEmail) {

    var Dj = app.models.dj;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

    Dj.create([
      {name: 'bradmin', email: adminEmail, password: 'admin'}
    ], function (err, djs) {
      if (err) {
        if(JSON.stringify(err).indexOf('Email already exists') > -1){
          console.log('admin user has already been created');
        } else {
          console.error(err);
        }
        return;
      }
      console.log('created djs', djs);
      Role.create({
        name: 'admin'
      }, function (err, role) {
        if (err) {
          console.error(err);
          console.error('role is: ', role);
          return;
        }

        // Make Bob an admin
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: _.last(djs).id
        }, function (err, principal) {
          if (err) {
            console.error(err);
            console.error('principal is: ', principal);
          }
        });
      });
    });
  }

};

