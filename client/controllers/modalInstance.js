'use strict';

angular.module('app.controllers')
.controller('ModalInstanceCtrl', function($scope, $modalInstance, $http, sessions) {
  console.log('Modal', sessions);

  $scope.sessions = sessions;

  $scope.send = function(message) {
    $http.post('/api/questions', {message: message})
    .success(function() {

      $modalInstance.close(/* saved data */);
    });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});
