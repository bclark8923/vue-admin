'use strict';

angular.module('app.controllers')
.controller('ModalInstanceCtrl', function($scope, $modalInstance, $http, devices) {
  console.log('Modal', devices);

  $scope.devices = devices;

  $scope.send = function(message) {
    $http.post('/api/questions', {message: message, devices: devices})
    .success(function() {

    })
    .finally(function() {
      $modalInstance.close(/* saved data */);
    })
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});
