'use strict';

angular.module('app.controllers')
.controller('DashboardCtrl', function($scope, Questions) {

  Questions.sync().then(function() {
    console.log('Questions.countries', Questions.countries());
    $scope.data = Questions.countries();
  });

  $scope.currentPage = Questions.page;
  $scope.pages = Questions.pages;

  $scope.realtime = true;



  $scope.$watch('currentPage', function() {
    $scope.data = Questions.countries();
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
