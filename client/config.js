'use strict';

angular.module('app')
.config(function($locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
})
.config(function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
})
.constant('version', '0.6')
