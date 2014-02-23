'use strict';

angular.module('app.controllers')
.controller('PushesCtrl', function($scope, Pushes) {
  $scope.pushes = Pushes.get;

});
