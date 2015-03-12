'use strict';

/**
 * @ngdoc function
 * @name vspApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vspApp
 */

angular.module('vspApp')
  .controller('MainCtrl', function ($scope, $rootScope, localStorageService, flowplayer, $log, $routeParams) {
    var player = flowplayer('player');
    $scope.video = _.extend({},localStorageService.get('video'));
    $scope.subtitle = localStorageService.get('subtitle') || {};

    if (!FileReader)
      $rootScope.alerts.push({type : "danger", msg: 'You are using an old browser and you wont be able to use file uploads. Copy paste the content of the subtitle.'});

    $log.debug("Router Params",$routeParams);

    if($routeParams.url)
      $scope.video.url = decodeURIComponent($routeParams.url);

    if($routeParams.source)
      $scope.video.source = decodeURIComponent($routeParams.source);

    $scope.updateVideo = function(){
      var video = $scope.video;
      localStorageService.set('video',video);
      $log.info("Updating video", video);
      player.updateVideo(video.source, video.url, video.suffix);
    };

    $scope.updateVideo();


    $scope.updateSubtitle = function(){
      var subtitle = $scope.subtitle;
      localStorageService.set('subtitle', subtitle);
      $log.info("Updating subtitle", subtitle);
      player.updateSubtitle(subtitle);
    };


    TogetherJS.on("ready", function () {
      $log.info("TogetherJS init");
    });

    TogetherJS.on("close", function () {
      $log.info("TogetherJS close")
    });

    TogetherJS.config("suppressInvite", true);
    TogetherJS.config("suppressJoinConfirmation", true);
    TogetherJS.config("dontShowClicks", true);
    TogetherJS.config("cloneClicks", false);
    TogetherJS.config("ignoreMessages", true);


    $scope.collaborate = function(){
      window.TogetherJSConfig_findRoom = $scope.share.id;
      TogetherJS(this);
    };


    TogetherJS.hub.on("sync", function (msg) {
      console.log(msg);
    });


    $scope.sync = function(){
      TogetherJS.send({type: "sync", message : player.getPlayerStatus()});
    };

  });
