'use strict';

/**
 * @ngdoc function
 * @name vspApp.controller:AlertsCtrl
 * @description
 * # AlertsCtrl
 * Controller of the vspApp
 */
angular.module('vspApp')
  .controller('AlertsCtrl', function ($rootScope, $scope) {
      $rootScope.alerts = [
        //{ type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
        //{ type: 'success', msg: 'Well done! You successfully read this important alert message.' }
      ];
      $scope.closeAlert = function(index) {
        $rootScope.alerts.splice(index, 1);
      };
  });
