var constants = require('../../constants');
var Mail = require('../../server/controllers/mail');


    var passwordResetUrl = 'http://' + constants.domain + '/account';

module.exports = function(Dj) {

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


  Dj.on('resetPasswordRequest', function(info) {
    console.log('reset pass info:', info);
    var passwordResetHref = passwordResetUrl + '?access_token=' + info.accessToken.id;

    var html = '<h2>XYZ</h2>' +
      '<p>Click the link below to reset your password:</p>' +
      '<a href="' + passwordResetHref + '">'+passwordResetHref+'</a> ' +
      '';


      Mail.sendMail({
          to: info.email,
          subject:'XYZ: password reset',
          body: html
        })
        .then(function(result){
          console.log('email queued:', result)
        })
        .catch(function(err){
          console.error('error sending password reset email to:', info.email);
          console.error(err);
          return err;
        })
  });
};
