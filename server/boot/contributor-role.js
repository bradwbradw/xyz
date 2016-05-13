module.exports = function (app) {
  console.log('ding!');

  var Role = app.models.Role;
  Role.registerResolver('contributor', function (role, context, cb) {
    function reject(err) {
      if (err) {
        return cb(err);
      }
      cb(null, false);
    }

    if (context.modelName !== 'Space') {
      // the target model is not project
      console.error('target model is not Space');
      return reject();
    }
    var userId = context.accessToken.userId;
    if (!userId) {
      return reject(); // do not allow anonymous users
    }
    // check if userId is in team table for the given project id
    context.model.findById(context.modelId, {include: 'contributors'}, function (err, space) {

      if (err || !space) {
        reject(err);
      }
      var userId = context.modelId;
      var spaceContributors = space.contributors();

      console.log('checking if user '+userId+' is in \n '+ JSON.stringify(spaceContributors,null,2));
      var contributor = _.find(space.contributors(), {id: userId});

      if (contributor) {

        console.log('contributor found: ', contributor);
        cb(null, true);
      } else {
        console.log('contributor not found');
        return reject(err);

      }

    });
  });
};