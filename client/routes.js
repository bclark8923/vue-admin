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
    state: 'pushes',
    resolve: {
      pushes: function(Pushes) {
        return Pushes.sync();
      }
    }
  })

  .otherwise({
    redirectTo: '/'
  });
})
.run(function($rootScope, $routeParams, $route, $interval, Pushes) {
  $rootScope.$route = $route;
  $rootScope.$routeParams = $routeParams;
  $rootScope.pushesCount = function() {
    return Pushes.get().length;
  };
  Pushes.sync();
  $interval(function() {
    Pushes.sync();
  }, 6000);

  $rootScope.isActive = function(state) {
    return ($route.current && $route.current.state) ? $route.current.state === state : null;
  };

});
