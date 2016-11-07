var constants = require('../../constants');
var Mail = require('../../server/controllers/mail');
var loopback = require('loopback');
var Role = loopback.getModel('Role');
var RoleMapping = loopback.getModel('RoleMapping');
var _ = require('lodash'), when = require('when');

var passwordResetUrl = 'https://' + constants.domain + '/account';

var userIdIsAdmin = function (id) {

  return when.promise(function (resolve, reject) {

    //console.log('is user with id ' + id + ' an admin?');
    RoleMapping.find({where: {principalId: id}}, function (err, roleMappings) {

      //console.log('got roleMappings ', roleMappings);
      if (err) {
        reject(err);
      }
      if (_.size(roleMappings) === 0) {
        resolve(false);
      }

      var fails = 0;
      var didCheckAllRoleMappings = function () {
        return fails === _.size(roleMappings)
      };
      var checkForAdmin = function (roleMapping) {
        Role.findById(roleMapping.roleId, function (err, role) {
          if (role.name === 'admin') {
            resolve(true);
          } else {
            fails++;
            if (didCheckAllRoleMappings()) {
              resolve(false);
            }
          }
        });
      };
      _.each(roleMappings, checkForAdmin);
    })
  })
};
module.exports = function (Dj) {

  //send verification email after registration
  // https://github.com/strongloop/loopback-example-user-management
  /*
   Dj.afterRemote('create', function(context, user, next) {
   console.log('> user.afterRemote triggered');

   var options = {
   type: 'email',
   to: user.email,
   from: 'noreply@loopback.com',
   subject: 'Thanks for registering.',
   template: path.resolve(__dirname, '../../server/views/verify.ejs'),
   redirect: '/verified',
   user: user
   };

   user.verify(options, function(err, response) {
   if (err) return next(err);

   console.log('> verification email sent:', response);

   context.res.render('response', {
   title: 'Signed up successfully',
   content: 'Please check your email and click on the verification link ' +
   'before logging in.',
   redirectTo: '/',
   redirectToLinkText: 'Log in'
   });
   });
   });*/

  Dj.afterRemote('find', function (context, djs, next) {
//    console.log(context);
    var userId = _.get(context, 'req.accessToken.userId');
    userIdIsAdmin(userId)
      .then(function (isAdmin) {
        console.log('is Admin? ', isAdmin);

        if (isAdmin) {
          _.each(djs, function (val, i) {
            // the action of converting the mongo document into an object
            // apparently causes the hidden fields property in the model definition
            // to not be considered (this is what I want, because I am trying to get
            // the user's email address for admin user requests
            djs[i] = _.omit(val.toObject(), 'password');
          });
          next();
        } else {
          next();
        }
      })
      .catch(function (err) {
        console.error(err);
        next();
      });
  });


  Dj.validatesUniquenessOf('name', {message: 'Already exists'});


  // length validation does not work due to: https://github.com/strongloop/loopback/issues/251
  // Dj.validatesLengthOf('password', {min: 5, message: {min: 'Minimum password length is 5 characters'}});

  Dj.on('resetPasswordRequest', function (info) {
    console.log('reset pass info:', info);
    var passwordResetHref = passwordResetUrl + '?access_token=' + info.accessToken.id;

    var html = '<h2>XYZ</h2>' +
      '<p>Click the link below to reset your password:</p>' +
      '<a href="' + passwordResetHref + '">' + passwordResetHref + '</a> ' +
      '';


    Mail.sendMail({
      to: info.email,
      subject: 'XYZ: password reset',
      body: html
    })
      .then(function (result) {
        console.log('email queued:', result)
      })
      .catch(function (err) {
        console.error('error sending password reset email to:', info.email);
        console.error(err);
        return err;
      })
  });
};
