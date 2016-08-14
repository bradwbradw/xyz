var constants = require('../../constants');

var when = require('when');

var _ = require('lodash');

var api_key = constants.mail.key;
var domain = constants.mail.domain;


var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


// required: data.to, data.text
var sendMail = function (data) {

  var mailData = {
    from: _.get(data,'from','xyz <feedback@xyz.gs>'),
    to: _.get(data, 'to'),
    subject: _.get(data, 'Subject', 'Message from XYZ'),
    html: _.get(data, 'body')
  };

  if (_.find(mailData, !_.isUndefined)){
    return when.reject('not all required properties are set (to, text)');
  }

  return when.promise(function (resolve, reject) {

    mailgun.messages().send(mailData, function (error, body) {
      if (error) {
        console.error('mail sending failed:', error);
        reject(error);
      } else {
        resolve(body);
      }
    });

  });
}


module.exports = {
  sendMail: sendMail
};