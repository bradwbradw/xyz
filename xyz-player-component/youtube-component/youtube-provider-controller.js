angular.module("xyzPlayer")
  .controller('youtubeProviderCtrl', function($scope, YT_event) {
  //initial settings
  this.width = 600,
    this.height = 480,
    this.videoid = "M7lc1UVf-VE",
    this.playerStatus = "NOT PLAYING"

  this.YT_event = YT_event;

  this.sendControlEvent = function(ctrlEvent) {
    console.log("SENDING");
    console.log(ctrlEvent);
    $scope.$broadcast(ctrlEvent);
  }

  $scope.$on(YT_event.STATUS_CHANGE, function(event, data) {
    this.yt.playerStatus = data;
  });

});