var constants = require('../../constants');
var Mail = require('../../server/controllers/mail');

module.exports = function(Dj) {

  //send verification email after registration
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
  });


  Dj.on('resetPasswordRequest', function(info) {
    console.log('reset pass info:', info);
    var url = 'http://' + constants.domain + '/password-reset/update';
    var html = 'Click <a href="' + url + '?access_token=' +
        info.accessToken.id + '">here</a> to reset your password';


      Mail.sendMail({
          to: info.email,
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
