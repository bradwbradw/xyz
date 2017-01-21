var adminEmail = process.env.CREATE_ADMIN_EMAIL;


module.exports = function (app) {

  if (adminEmail) {

    var Dj = app.models.dj;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

    Dj.create({name: 'bradmin', email: adminEmail, password: 'admin'}, function (err, result) {
      if (err) {
        if (JSON.stringify(err).indexOf('Email already exists') > -1) {
          console.log('admin user has already been created:');
        } else {
          console.error("error creating admin user", err);
        }
      }
      console.log('the admin account: ', result);
      Role.create({
          name: 'admin'
        }, function (err, role) {
          if (err) {

            if (JSON.stringify(err).indexOf('already exists') > -1) {
              console.log('admin role has already been created: ');
            } else {
              console.error("error creating admin role: ",err);
              return;
            }
          }
          console.log('the admin role: ', role);
         
          // Make bradmin an admin
          role.principals.create({
            principalType: RoleMapping.USER,
            principalId: result.id
          }, function (err, principal) {
            if (err) {
              console.error("error attaching user to admin role", err);
              console.error('principal is: ', principal);
            } else {
              console.log('assigned user to admin role: ', result);
            }
          });
        }
      );
    });
  }

};

