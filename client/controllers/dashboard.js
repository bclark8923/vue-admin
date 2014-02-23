'use strict';

angular.module('app.controllers')
.controller('DashboardCtrl', function($scope, Questions) {

  Questions.sync();

  $scope.realtime = true;

  $scope.questions = Questions.first;

});
