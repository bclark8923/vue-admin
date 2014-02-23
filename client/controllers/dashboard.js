'use strict';

angular.module('app.controllers')
.controller('DashboardCtrl', function($scope, $modal, Questions) {

  Questions.sync().then(function() {
    $scope.data = Questions.countries($scope.currentPage);
  });

  $scope.currentPage = Questions.page;
  $scope.pages = Questions.pages;

  $scope.realtime = true;


  $scope.send = function() {
    $modal.open({
      templateUrl: 'templates/modal.html',
      controller: 'ModalInstanceCtrl'
    }).result
    .then(function () {

    });
  };


  $scope.$watch('currentPage', function() {
    $scope.data = Questions.countries($scope.currentPage);
    console.log('Questions.countries', $scope.data);
  });

  $scope.checkPage = function(page) {
    return $scope.currentPage === page;
  };

  $scope.changePage = function(page) {
    $scope.currentPage = page;
  };

  $scope.nextPage = function() {
    if ($scope.pages().length -1 > $scope.currentPage) {
      ++$scope.currentPage;
    }
  };

  $scope.previousPage = function() {
    if ($scope.currentPage) {
      --$scope.currentPage;
    }
  };


  $scope.questions = function() {
    return Questions.pagination($scope.currentPage);
  };

});
