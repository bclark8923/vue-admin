'use strict';

angular.module('app.controllers')
.controller('ModalInstanceCtrl', function($scope, $modalInstance) {

  $scope.ok = function () {
    $modalInstance.close(/* saved data */);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});
