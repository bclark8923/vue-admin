'use strict';

/* Services */
angular.module('app.services')
.factory('Pushes', function($http, $q, _) {
  var _pushes = [];
  return {
    sync: function() {
      var dfd = $q.defer();
      $http.get('/api/questions').success(function(questions) {
        _pushes = questions;
        dfd.resolve(_pushes);
      });

      return dfd.promise;
    },
    get: function() {
      return _pushes;
    }
  };

});
