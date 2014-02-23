'use strict';

angular.module('app.controllers')
.controller('DashboardCtrl', function($scope, Questions) {

  Questions.sync();

  $scope.page = 0;

  $scope.realtime = true;

  $scope.questions = function() {
    return Questions.pagination($scope.page);
  };

});
