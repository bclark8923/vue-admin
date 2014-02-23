'use strict';

angular.module('app')
// configure views; the authRequired parameter is used for specifying pages
// which should only be available while logged in
.config(function($routeProvider) {
  var baseTemplateUrl = '/templates';
  $routeProvider
  .when('/', {
    templateUrl: baseTemplateUrl + '/dashboard.html',
    controller: 'DashboardCtrl',
    state: 'dashboard',
    ribbon: true
  })

  .when('/sessions', {
    templateUrl: baseTemplateUrl + '/sessions.html',
    controller: 'SessionsCtrl',
    state: 'sessions'
  })

  .when('/sessions/:sessionID', {
    templateUrl: baseTemplateUrl + '/session.html',
    controller: 'SessionCtrl',
    state: 'sessions',
    resolve: {
      session: function($http, $q, $route) {
        var dfd = $q.defer();
        $http.get('/api/sessions/'+$route.current.params.sessionID)
        .success(dfd.resolve);
        return dfd.promise;
      }
    }
  })


  .when('/pushes', {
    templateUrl: baseTemplateUrl + '/pushes.html',
    controller: 'PushesCtrl',
    state: 'pushes'
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
