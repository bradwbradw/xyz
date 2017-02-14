angular.module('xyzApp')
  .run(function ($location, $window, Content) {

    if ($location.hash() === 'tour') {

      Content.fetch()
        .then(function (content) {

          var Sideshow = $window.Sideshow;
          Sideshow.config.language = "en";
          Sideshow.init();
          Sideshow.registerWizard({
            name: "introducing_sideshow",
            title: content['tour-title'].content.md,
            description: content['tour-subtitle'].content.md,
            estimatedTime: "10 Minutes",
            affects: [
              {hash: ""}, //This tutorial would be eligible for URLs like this "http://www.foo.com/bar#messages"
              {route: "", caseSensitive: true},  //This tutorial would be eligible for URLs like this "http://www.foo.com/adm/orders"
              function () {
                //Here we could do any checking to infer if this tutorial is eligible the current screen/context.
                //After this checking, just return a boolean indicating if this tutorial will be available.
                return true;//
              }
            ]
          })
            .storyLine({
              showStepPosition: true,
              steps: [
                {
                  title: "Hello Sideshow.",
                  text: "log in here",
                  subject: "#signup-login-link",
                  targets: "#signup-login-link",

                  completingConditions: [
                    function () {
                      return $location.path().indexOf('signup') >= 0;
                    }
                  ]

                },
                {
                  title: "enter your email",
                  text: "an email",
                  subject: "#register-email-field",
                  targets: "#register-email-field"
                },
                {
                  title: "enter a password",
                  text: "enter a password that has minimum of 6 characters",
                  subject: "#register-password-field",
                  targets: "#register-password-field"
                }
              ]
            });

          Sideshow.start({listAll: true});


        });

    }
  });