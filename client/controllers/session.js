'use strict';

angular.module('app.controllers')
.controller('SessionCtrl', function($scope, $modal, $routeParams, _, session) {
  $scope.session = session;
/*
  Questions.sync().then(function() {
    $scope.data = Questions.countries($scope.currentPage);
  });
*/
});
