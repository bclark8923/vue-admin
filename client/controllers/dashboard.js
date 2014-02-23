'use strict';

angular.module('app.controllers')
.controller('DashboardCtrl', function($scope, Questions) {

  Questions.sync();

  $scope.page = Questions.page;

  $scope.realtime = true;

  $scope.data = {
    'US': 4977,
    'AU': 4873,
    'IN': 3671,
    'BR': 2476,
    'TR': 1476,
    'CN': 146,
    'CA': 134,
    'BD': 100
  };

  $scope.questions = function() {
    return Questions.pagination($scope.page);
  };

});
