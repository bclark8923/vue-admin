'use strict';

angular.module('app.controllers')
.controller('RibbonCtrl', function($scope, $timeout) {
  console.log('Ribbon');
  var ribbonCtrl = this;

  $scope.actions1 = [
    {name:'Visited', value:''},
    {name:'Tapped', value:'tap'},
    {name:'Scrolled', value: 'swipe'},
  ];

  ribbonCtrl.action1 = $scope.actions1[0].value;


  var action3 = {
    'app': [
      {name: 'FoodLog'},
    ],
    'page': [
      {name: 'FoodLog'},
      {name: 'FitnessLog'},
      {name: 'MeasurementLog'}
    ],
    'button': [
      {name: 'Add Food - FoodLog'},
      {name: 'Confirm - AddFoodLog'},
      {name: 'Cancel - AddFoodLog'}
    ]
  };

  $scope.actions2 = [
    {name:'app'},
    {name:'page'},
    {name:'button'},
  ];
  console.log('action2', $scope.action2);

  ribbonCtrl.action2 = $scope.actions2[0];

  $scope.actions3 = angular.copy(action3[ribbonCtrl.action2.name]);
  ribbonCtrl.action3 = angular.copy($scope.actions3[0]);

  $scope.updateAction = function(action) {
    $scope.actions3 = action3[action];
    console.log('change', action, ribbonCtrl.action3, $scope.actions3);
  };





  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.showWeeks = true;
  $scope.toggleWeeks = function () {
    $scope.showWeeks = ! $scope.showWeeks;
  };

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return false;
  };

  $scope.toggleMin = function() {
    $scope.minDate = ( $scope.minDate ) ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    'year-format': '"yy"',
    'starting-day': 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
  $scope.format = $scope.formats[0];

});
