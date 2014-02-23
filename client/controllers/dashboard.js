'use strict';

angular.module('app.controllers')
.controller('DashboardCtrl', function($scope, $modal, Questions, _) {


  $scope.questions = function() {
    return Questions.getReduced();//pagination($scope.currentPage);
  };

  Questions.sync().then(function() {
    $scope.data = Questions.countries($scope.currentPage);
  });

  $scope.selection = [];
  $scope.currentPage = Questions.page;
  $scope.pages = Questions.pages;

  $scope.realtime = true;

  $scope.selectAll = true;


  $scope.addSelection = function(session) {
    if (!_.contains($scope.selection, session.deviceID)) {
      $scope.selection.push(session.deviceID);
    }
  };

  $scope.removeSelection = function(session) {
    var index = $scope.selection.indexOf(session.deviceID);
    if (index !== -1) {
      $scope.selection.splice(index, 1);
    }
  };

  $scope.$watch('selectAll', function(newVal, oldVal) {
    $scope.toggleAll($scope.questions(), oldVal);
  });


  $scope.toggleAll = function(collection, toggle) {
    console.log('Toggle All', collection);
    _.each(collection, function(item) {
      if (toggle) {
        item.checked = false;
        $scope.removeSelection(item);
      } else {
        item.checked = true;
        $scope.addSelection(item);
      }
    });
  };

  $scope.checkSelection = function(session) {
    if (!session.checked) {
      session.checked = true;
      $scope.addSelection(session);
    } else {
      session.checked = false;
      $scope.removeSelection(session);
    }
  };


  $scope.openModal = function(selection) {
    $modal.open({
      templateUrl: 'templates/modal.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
        devices: function() {
          return selection;
        }
      }
    }).result
    .then(function() {
      console.log('End Modal');
      _.each($scope.pages(), function(collection) {
        $scope.toggleAll(collection, true);
        $scope.selectAll = false;
      });
    });
  };


  $scope.$watch('currentPage', function() {
    $scope.data = Questions.countries($scope.currentPage);
    $scope.selectAll = false;
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

});
