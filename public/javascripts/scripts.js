'use strict';
/* Modules */
angular.module('app.modules', []);
'use strict';
/* Directives */
angular.module('app.directives', []);
'use strict';
/* Directives */
angular.module('app.directives').directive('vectorMap', function () {
  return {
    restrict: 'AE',
    replace: false,
    scope: { data: '=countries' },
    link: function (scope, element, attrs) {
      function renderVectorMap() {
        element.vectorMap({
          map: attrs.map || 'world_mill_en',
          backgroundColor: attrs.backgroundColor || '#fff',
          regionStyle: {
            initial: { fill: '#c4c4c4' },
            hover: { 'fill-opacity': 1 }
          },
          series: {
            regions: [{
                values: scope.data,
                scale: [
                  '#85a8b6',
                  '#4d7686'
                ],
                normalizeFunction: 'polynomial'
              }]
          },
          onRegionLabelShow: function (event, el, code) {
            if (angular.isUndefined(scope.data[code])) {
              event.preventDefault();
            } else {
              var countrylbl = scope.data[code];
              el.html(el.html() + ': ' + countrylbl + ' users');
            }
          }
        });
      }
      scope.$watch('data', function () {
        element.find('.jvectormap-container').remove();
        renderVectorMap();
      });
    }
  };
});
'use strict';
/* Filters */
angular.module('app.filters', []).filter('slice', function () {
  return function (arr, start, end) {
    return arr.slice(start, end);
  };
});
'use strict';
/* Services */
angular.module('app.services', []);
'use strict';
/* Services */
angular.module('app.services').factory('Pushes', [
  '$http',
  '$q',
  '_',
  function ($http, $q, _) {
    var _pushes = [];
    return {
      sync: function () {
        var dfd = $q.defer();
        $http.get('/api/questions', { ignoreLoadingBar: true }).success(function (questions) {
          _pushes = questions;
          dfd.resolve(_pushes);
        });
        return dfd.promise;
      },
      get: function () {
        return _pushes;
      }
    };
  }
]);
'use strict';
/* Services */
angular.module('app.services').factory('Questions', [
  '$http',
  '$q',
  '_',
  function ($http, $q, _) {
    var _questions = [];
    var _pages = [];
    var cache = {};
    return {
      sync: function () {
        var self = this;
        console.log('Questions: SYNC', _questions);
        var dfd = $q.defer();
        if (!cache[_pages.length]) {
          cache[_pages.length] = $http.get('/api/sessions').success(function (sessions, length) {
            console.log('Questions: success', sessions, length);
            _pages['0'] = sessions.slice(0, 20);
            _pages['1'] = sessions.slice(20, 40);
            _pages['2'] = sessions.slice(40, 60);
            _pages['3'] = sessions.slice(80, 100);
            _questions = _pages[self.page];
            dfd.resolve(_questions);
          });
        } else {
          dfd.resolve(cache[_pages.length]);
        }
        return dfd.promise;
      },
      pages: function () {
        return _pages;
      },
      page: 0,
      pagination: function (page) {
        return _pages[page];
      },
      countries: function (page) {
        var self = this;
        var countries = {};
        _.each(self.pagination(page), function (obj) {
          countries[obj.country] = !countries[obj.country] ? 1 : ++countries[obj.country];
        });
        return countries;
      },
      get: function () {
        console.log('Questions: GET', _questions);
        return _questions;
      },
      getReduced: function () {
        var reduced = _questions.reduce(function (result, o) {
            var unit = o.deviceID;
            console.log(unit);
            if (!(unit in result)) {
              result.arr.push(result[unit] = {
                device: unit,
                sessionTime: o.time,
                sessions: 1
              });
            } else {
              result[unit].sessionTime += o.time;
              result[unit].sessions += 1;
            }
            return result;
          }, { arr: [] }).arr;
        return reduced;
      },
      first: function (amount) {
        return _.first(_questions, amount);
      },
      range: function () {
      },
      query: function () {
      }
    };
  }
]);
'use strict';
/* Services */
angular.module('app.services').factory('Sessions', function () {
  var session = [
      {
        deviceID: 'one',
        city: 'San Francisco',
        location: {
          lat: 37.75,
          lon: 122.68
        },
        start: '02-21-2014T03:14:29',
        end: '02-21-2014T03:14:45',
        interactions: [
          {
            time: 1,
            object: 'UIButton',
            page: 'fvLoginController',
            type: 'tap',
            buttonName: 'Login'
          },
          {
            time: 2,
            object: 'UIScrollView',
            page: 'fvFoodLogController',
            type: 'tap',
            numTaps: 1
          },
          {
            time: 3,
            x: 120,
            y: 104,
            object: 'UIScrollView',
            page: 'fvFoodLogController',
            type: 'swipeUp'
          },
          {
            time: 4,
            x: 120,
            y: 104,
            object: 'UIScrollView',
            page: 'fvFoodLogController',
            type: 'swipeDown'
          },
          {
            time: 4,
            x: 120,
            y: 104,
            object: 'UIScrollView',
            page: 'fvFoodLogController',
            type: 'swipeDown'
          },
          {
            time: 4,
            x: 120,
            y: 104,
            object: 'UIScrollView',
            page: 'fvFoodLogController',
            type: 'swipeDown'
          },
          {
            time: 7,
            object: 'UIScrollView',
            page: 'fvMeasurementLogController',
            type: 'tap'
          },
          {
            time: 12,
            object: 'UIScrollView',
            page: 'fvUserController',
            type: 'tap'
          },
          {
            time: 14,
            object: 'UIButton',
            page: 'fvUserController',
            type: 'tap',
            buttonName: 'Logout'
          }
        ]
      },
      {
        deviceID: 'one',
        city: 'Hong Kong',
        location: {
          lat: 22.28552,
          lon: 114.15769
        },
        start: '02-21-2014T03:14:29',
        end: '02-21-2014T03:14:45',
        interactions: [
          {
            time: 1,
            object: 'UIButton',
            page: 'fvLoginController',
            type: 'tap',
            buttonName: 'Login'
          },
          {
            time: 2,
            object: 'UIScrollView',
            page: 'fvFoodLogController',
            type: 'tap'
          },
          {
            time: 3,
            x: 120,
            y: 104,
            object: 'UIScrollView',
            page: 'fvFoodLogController',
            type: 'swipeUp'
          },
          {
            time: 4,
            x: 120,
            y: 104,
            object: 'UIScrollView',
            page: 'fvFoodLogController',
            type: 'swipeDown'
          },
          {
            time: 4,
            x: 120,
            y: 104,
            object: 'UIScrollView',
            page: 'fvFoodLogController',
            type: 'swipeDown'
          },
          {
            time: 4,
            x: 120,
            y: 104,
            object: 'UIScrollView',
            page: 'fvFoodLogController',
            type: 'swipeDown'
          },
          {
            time: 7,
            object: 'UIScrollView',
            page: 'fvMeasurementLogController',
            type: 'tap'
          },
          {
            time: 12,
            object: 'UIScrollView',
            page: 'fvUserController',
            type: 'tap'
          },
          {
            time: 14,
            object: 'UIButton',
            page: 'fvUserController',
            type: 'tap',
            buttonName: 'Logout'
          }
        ]
      },
      {
        deviceID: 'two',
        city: 'San Francisco',
        location: {
          lat: 37.75,
          lon: 122.68
        },
        start: '02-21-2014T03:14:29',
        end: '02-21-2014T03:14:45',
        interactions: [
          {
            time: 1,
            object: 'UIButton',
            page: 'fvLoginController',
            type: 'tap',
            buttonName: 'Login'
          },
          {
            time: 2,
            object: 'UIScrollView',
            page: 'fvFoodLogController',
            type: 'tap',
            numTaps: 1
          },
          {
            time: 3,
            x: 120,
            y: 104,
            object: 'UIScrollView',
            page: 'fvFoodLogController',
            type: 'swipeUp'
          },
          {
            time: 4,
            x: 120,
            y: 104,
            object: 'UIScrollView',
            page: 'fvFoodLogController',
            type: 'swipeDown'
          },
          {
            time: 4,
            x: 120,
            y: 104,
            object: 'UIScrollView',
            page: 'fvFoodLogController',
            type: 'swipeDown'
          },
          {
            time: 4,
            x: 120,
            y: 104,
            object: 'UIScrollView',
            page: 'fvFoodLogController',
            type: 'swipeDown'
          },
          {
            time: 7,
            object: 'UIScrollView',
            page: 'fvMeasurementLogController',
            type: 'tap'
          },
          {
            time: 12,
            object: 'UIScrollView',
            page: 'fvUserController',
            type: 'tap'
          },
          {
            time: 14,
            object: 'UIButton',
            page: 'fvUserController',
            type: 'tap',
            buttonName: 'Logout'
          }
        ]
      },
      {
        deviceID: 'two',
        city: 'Hong Kong',
        location: {
          lat: 22.28552,
          lon: 114.15769
        },
        start: '02-21-2014T03:14:29',
        end: '02-21-2014T03:14:45',
        interactions: [
          {
            time: 1,
            object: 'UIButton',
            page: 'fvLoginController',
            type: 'tap',
            buttonName: 'Login'
          },
          {
            time: 2,
            object: 'UIScrollView',
            page: 'fvFoodLogController',
            type: 'tap'
          },
          {
            time: 3,
            x: 120,
            y: 104,
            object: 'UIScrollView',
            page: 'fvFoodLogController',
            type: 'swipeUp'
          },
          {
            time: 4,
            x: 120,
            y: 104,
            object: 'UIScrollView',
            page: 'fvFoodLogController',
            type: 'swipeDown'
          },
          {
            time: 4,
            x: 120,
            y: 104,
            object: 'UIScrollView',
            page: 'fvFoodLogController',
            type: 'swipeDown'
          },
          {
            time: 4,
            x: 120,
            y: 104,
            object: 'UIScrollView',
            page: 'fvFoodLogController',
            type: 'swipeDown'
          },
          {
            time: 7,
            object: 'UIScrollView',
            page: 'fvMeasurementLogController',
            type: 'tap'
          },
          {
            time: 12,
            object: 'UIScrollView',
            page: 'fvUserController',
            type: 'tap'
          },
          {
            time: 14,
            object: 'UIButton',
            page: 'fvUserController',
            type: 'tap',
            buttonName: 'Logout'
          }
        ]
      }
    ];
  return session;
});
'use strict';
/* Services */
angular.module('app.services').value('_', window._);
'use strict';
/* Controllers */
angular.module('app.controllers', []);
'use strict';
angular.module('app.controllers').controller('DashboardCtrl', [
  '$scope',
  '$modal',
  'Questions',
  '_',
  function ($scope, $modal, Questions, _) {
    $scope.questions = function () {
      return Questions.getReduced();  //pagination($scope.currentPage);
    };
    Questions.sync().then(function () {
      $scope.data = Questions.countries($scope.currentPage);
    });
    $scope.selection = [];
    $scope.currentPage = Questions.page;
    $scope.pages = Questions.pages;
    $scope.realtime = true;
    $scope.selectAll = true;
    $scope.addSelection = function (session) {
      if (!_.contains($scope.selection, session.deviceID)) {
        $scope.selection.push(session.deviceID);
      }
    };
    $scope.removeSelection = function (session) {
      var index = $scope.selection.indexOf(session.deviceID);
      if (index !== -1) {
        $scope.selection.splice(index, 1);
      }
    };
    $scope.$watch('selectAll', function (newVal, oldVal) {
      $scope.toggleAll($scope.questions(), oldVal);
    });
    $scope.toggleAll = function (collection, toggle) {
      console.log('Toggle All', collection);
      _.each(collection, function (item) {
        if (toggle) {
          item.checked = false;
          $scope.removeSelection(item);
        } else {
          item.checked = true;
          $scope.addSelection(item);
        }
      });
    };
    $scope.checkSelection = function (session) {
      if (!session.checked) {
        session.checked = true;
        $scope.addSelection(session);
      } else {
        session.checked = false;
        $scope.removeSelection(session);
      }
    };
    $scope.openModal = function (selection) {
      $modal.open({
        templateUrl: 'templates/modal.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
          devices: function () {
            return selection;
          }
        }
      }).result.then(function () {
        console.log('End Modal');
        _.each($scope.pages(), function (collection) {
          $scope.toggleAll(collection, true);
          $scope.selectAll = false;
        });
      });
    };
    $scope.$watch('currentPage', function () {
      $scope.data = Questions.countries($scope.currentPage);
      $scope.selectAll = false;
      console.log('Questions.countries', $scope.data);
    });
    $scope.checkPage = function (page) {
      return $scope.currentPage === page;
    };
    $scope.changePage = function (page) {
      $scope.currentPage = page;
    };
    $scope.nextPage = function () {
      if ($scope.pages().length - 1 > $scope.currentPage) {
        ++$scope.currentPage;
      }
    };
    $scope.previousPage = function () {
      if ($scope.currentPage) {
        --$scope.currentPage;
      }
    };
  }
]);
'use strict';
angular.module('app.controllers').controller('ModalInstanceCtrl', [
  '$scope',
  '$modalInstance',
  '$http',
  'devices',
  function ($scope, $modalInstance, $http, devices) {
    console.log('Modal', devices);
    $scope.devices = devices;
    $scope.send = function (message) {
      $http.post('/api/questions', {
        message: message,
        devices: devices
      }).success(function () {
      }).finally(function () {
        $modalInstance.close();
      });
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);
'use strict';
angular.module('app.controllers').controller('PushesCtrl', [
  '$scope',
  'Pushes',
  function ($scope, Pushes) {
    $scope.pushes = Pushes.get;
  }
]);
'use strict';
angular.module('app.controllers').controller('RibbonCtrl', [
  '$scope',
  '$timeout',
  function ($scope, $timeout) {
    console.log('Ribbon');
    var ribbonCtrl = this;
    $scope.actions1 = [
      {
        name: 'Visited',
        value: ''
      },
      {
        name: 'Tapped',
        value: 'tap'
      },
      {
        name: 'Scrolled',
        value: 'swipe'
      }
    ];
    ribbonCtrl.action1 = $scope.actions1[0].value;
    var action3 = {
        'app': [{ name: 'FoodLog' }],
        'page': [
          { name: 'FoodLog' },
          { name: 'FitnessLog' },
          { name: 'MeasurementLog' }
        ],
        'button': [
          { name: 'Add Food - FoodLog' },
          { name: 'Confirm - AddFoodLog' },
          { name: 'Cancel - AddFoodLog' }
        ]
      };
    $scope.actions2 = [
      { name: 'app' },
      { name: 'page' },
      { name: 'button' }
    ];
    console.log('action2', $scope.action2);
    ribbonCtrl.action2 = $scope.actions2[0];
    $scope.actions3 = angular.copy(action3[ribbonCtrl.action2.name]);
    ribbonCtrl.action3 = angular.copy($scope.actions3[0]);
    $scope.updateAction = function (action) {
      $scope.actions3 = action3[action];
      console.log('change', action, ribbonCtrl.action3, $scope.actions3);
    };
    $scope.today = function () {
      $scope.dt = new Date();
    };
    $scope.today();
    $scope.showWeeks = true;
    $scope.toggleWeeks = function () {
      $scope.showWeeks = !$scope.showWeeks;
    };
    $scope.clear = function () {
      $scope.dt = null;
    };
    // Disable weekend selection
    $scope.disabled = function (date, mode) {
      return false;
    };
    $scope.toggleMin = function () {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();
    $scope.open = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };
    $scope.dateOptions = {
      'year-format': '"yy"',
      'starting-day': 1
    };
    $scope.formats = [
      'dd-MMMM-yyyy',
      'yyyy/MM/dd',
      'shortDate'
    ];
    $scope.format = $scope.formats[0];
  }
]);
'use strict';
angular.module('app.controllers').controller('SessionCtrl', [
  '$scope',
  '$modal',
  '$routeParams',
  '_',
  'session',
  function ($scope, $modal, $routeParams, _, session) {
    $scope.session = session;  /*
  Questions.sync().then(function() {
    $scope.data = Questions.countries($scope.currentPage);
  });
*/
  }
]);
'use strict';
angular.module('app.controllers').controller('SessionsCtrl', [
  '$scope',
  '$modal',
  '$location',
  'Questions',
  '_',
  function ($scope, $modal, $location, Questions, _) {
    Questions.sync().then(function () {
      $scope.data = Questions.countries($scope.currentPage);
    });
    $scope.selection = [];
    $scope.currentPage = Questions.page;
    $scope.pages = Questions.pages;
    $scope.realtime = true;
    $scope.selectAll = true;
    $scope.addSelection = function (session) {
      if (!_.contains($scope.selection, session.deviceID)) {
        $scope.selection.push(session.deviceID);
      }
    };
    $scope.removeSelection = function (session) {
      var index = $scope.selection.indexOf(session.deviceID);
      if (index !== -1) {
        $scope.selection.splice(index, 1);
      }
    };
    $scope.$watch('selectAll', function (newVal, oldVal) {
      $scope.toggleAll($scope.questions(), oldVal);
    });
    $scope.toggleAll = function (collection, toggle) {
      console.log('Toggle All', collection);
      _.each(collection, function (item) {
        if (toggle) {
          item.checked = false;
          $scope.removeSelection(item);
        } else {
          item.checked = true;
          $scope.addSelection(item);
        }
      });
    };
    $scope.checkSelection = function (session) {
      if (!session.checked) {
        session.checked = true;
        $scope.addSelection(session);
      } else {
        session.checked = false;
        $scope.removeSelection(session);
      }
    };
    $scope.goSessionID = function (sessionID) {
      $location.path('/sessions/' + sessionID);
    };
    $scope.openModal = function (selection) {
      $modal.open({
        templateUrl: 'templates/modal.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
          devices: function () {
            return selection;
          }
        }
      }).result.then(function () {
        console.log('End Modal');
        _.each($scope.pages(), function (collection) {
          $scope.toggleAll(collection, true);
          $scope.selectAll = false;
        });
      });
    };
    $scope.$watch('currentPage', function () {
      $scope.data = Questions.countries($scope.currentPage);
      $scope.selectAll = false;
      console.log('Questions.countries', $scope.data);
    });
    $scope.checkPage = function (page) {
      return $scope.currentPage === page;
    };
    $scope.changePage = function (page) {
      $scope.currentPage = page;
    };
    $scope.nextPage = function () {
      if ($scope.pages().length - 1 > $scope.currentPage) {
        ++$scope.currentPage;
      }
    };
    $scope.previousPage = function () {
      if ($scope.currentPage) {
        --$scope.currentPage;
      }
    };
    $scope.questions = function () {
      return Questions.pagination($scope.currentPage);
    };
  }
]);
'use strict';
angular.module('app.controllers').controller('UserCtrl', [
  '$scope',
  function ($scope) {
    $scope.user = 'PatrickJS';
  }
]);
'use strict';
// Declare app level module which depends on filters, and services
angular.module('app', [
  'app.filters',
  'app.modules',
  'app.services',
  'app.directives',
  'app.controllers',
  'app.dependencies'
]);
angular.module('app.dependencies', [
  'ngRoute',
  'ngAnimate',
  'ui.utils',
  'ui.bootstrap',
  'chieffancypants.loadingBar'
]);
'use strict';
angular.module('app').config([
  '$locationProvider',
  function ($locationProvider) {
  }
]).config([
  'cfpLoadingBarProvider',
  function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.parentSelector = 'body';
  }
]);
'use strict';
angular.module('app').config([
  '$routeProvider',
  function ($routeProvider) {
    var baseTemplateUrl = '/templates';
    $routeProvider.when('/', {
      templateUrl: baseTemplateUrl + '/dashboard.html',
      controller: 'DashboardCtrl',
      state: 'dashboard',
      ribbon: true
    }).when('/sessions', {
      templateUrl: baseTemplateUrl + '/sessions.html',
      controller: 'SessionsCtrl',
      state: 'sessions'
    }).when('/sessions/:sessionID', {
      templateUrl: baseTemplateUrl + '/session.html',
      controller: 'SessionCtrl',
      state: 'sessions',
      resolve: {
        session: function ($http, $q, $route) {
          var dfd = $q.defer();
          $http.get('/api/sessions/' + $route.current.params.sessionID).success(dfd.resolve);
          return dfd.promise;
        }
      }
    }).when('/pushes', {
      templateUrl: baseTemplateUrl + '/pushes.html',
      controller: 'PushesCtrl',
      state: 'pushes',
      resolve: {
        pushes: function (Pushes) {
          return Pushes.sync();
        }
      }
    }).otherwise({ redirectTo: '/' });
  }
]).run([
  '$rootScope',
  '$routeParams',
  '$route',
  '$interval',
  'Pushes',
  function ($rootScope, $routeParams, $route, $interval, Pushes) {
    $rootScope.$route = $route;
    $rootScope.$routeParams = $routeParams;
    $rootScope.pushesCount = function () {
      return Pushes.get().length;
    };
    Pushes.sync();
    $interval(function () {
      Pushes.sync();
    }, 3000);
    $rootScope.isActive = function (state) {
      return $route.current && $route.current.state ? $route.current.state === state : null;
    };
  }
]);