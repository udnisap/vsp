'use strict';

/**
 * @ngdoc function
 * @name vspApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vspApp
 */
angular.module('vspApp')
  .controller('MainCtrl', function ($scope, flowplayer) {
    var player = flowplayer('player');
    $scope.alerts = [
      //{ type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
      //{ type: 'success', msg: 'Well done! You successfully read this important alert message.' }
    ];

    $scope.addAlert = function() {
      $scope.alerts.push({msg: 'Another alert!'});
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    $scope.updateVideo = function(){
      console.log($scope.video);
    };

    $scope.updateSubtitles = function(){
      console.log($scope.subtitle);
    };


  });
