'use strict';

angular.module('app')
// configure views; the authRequired parameter is used for specifying pages
// which should only be available while logged in
.config(function($routeProvider) {
  var baseTemplateUrl = '/templates';
  $routeProvider
  .when('/', {
    templateUrl: baseTemplateUrl + '/index.html',
    controller: 'HomeCtrl'
  })


  .otherwise({
    redirectTo: '/'
  });
})
.run(function($rootScope, $routeParams, $route) {
  $rootScope.$route = $route;
  $rootScope.$routeParams = $routeParams;

  $rootScope.isActive = function(state) {
    return ($route.current && $route.current.state) ? $route.current.state === state : null;
  };

});
