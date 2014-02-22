'use strict';

angular.module('app.controllers')
.controller('DashboardCtrl', function($scope, $http) {
  $scope.world = 'World';

  $scope.realtime = true;

  $scope.sessions = [
    {
      id: 677,
      byDate : new Date(),
      length: 234,
      seconds: 17
    },
    {
      id: 677,
      byDate : new Date(),
      length: 234,
      seconds: 17
    },
    {
      id: 677,
      byDate : new Date(),
      length: 234,
      seconds: 17
    }
  ];

});
