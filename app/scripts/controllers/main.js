'use strict';

/**
 * @ngdoc function
 * @name vspApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vspApp
 */
angular.module('vspApp')
  .controller('MainCtrl', function ($scope, $rootScope, localStorageService, flowplayer, $log) {
    var player = flowplayer('player');
    $scope.video = localStorageService.get('video') || {};
    $scope.subtitle = localStorageService.get('subtitle') || {};

    if (!FileReader)
      $rootScope.alerts.push({type : "danger", msg: 'You are using an old browser and you wont be able to use file uploads. Copy paste the content of the subtitle.'});

    $scope.updateVideo = function(){
      var video = $scope.video;
      localStorageService.set('video',video);
      $log.info("Updating video", video);
      player.updateVideo(video.source, video.url, video.suffix);
    };


    $scope.updateSubtitle = function(){
      var subtitle = $scope.subtitle;
      localStorageService.set('subtitle', subtitle);
      $log.info("Updating subtitle", subtitle);
      player.updateSubtitle(subtitle);
    };


  });
