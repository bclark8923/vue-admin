'use strict';

/* Services */
angular.module('app.services')
.factory('Questions', function($http, $q, _) {
  var _questions = [];
  return {
    sync: function() {
      console.log('Questions: SYNC', _questions);
      var dfd = $q.defer();

      $http.get('/api/sessions')
      .success(function(sessions, length) {
        console.log('Questions: success', sessions, length);
        _questions = _.sample(sessions, 20);
        dfd.resolve(_questions);
      });

      return dfd.promise;
    },
    get: function() {
      console.log('Questions: GET', _questions);
      return _questions;
    },
    first: function(amount) {
      return _.first(_questions, amount);
    },
    range: function() {
      // return _.range();
    },
    query: function() {

    }
  };

});
