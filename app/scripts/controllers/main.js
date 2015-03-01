'use strict';

/**
 * @ngdoc function
 * @name vspApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vspApp
 */
angular.module('vspApp')
  .controller('MainCtrl', function ($scope, localStorageService, flowplayer, $log) {
    var player = flowplayer('player');
    $scope.video = localStorageService.get('video') || {};
    $scope.subtitle = localStorageService.get('subtitle') || {};
    $scope.alerts = [
      //{ type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
      //{ type: 'success', msg: 'Well done! You successfully read this important alert message.' }
    ];

    player =flowplayer('player');

    $scope.addAlert = function() {
      $scope.alerts.push({msg: 'Another alert!'});
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

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
