'use strict';

angular.module('app.controllers')
.controller('ModalInstanceCtrl', function($scope, $modalInstance, sessions) {
  console.log('Modal', sessions);

  $scope.sessions = sessions;

  $scope.ok = function () {
    $modalInstance.close(/* saved data */);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});
