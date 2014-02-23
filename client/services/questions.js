'use strict';

/* Services */
angular.module('app.services')
.factory('Questions', function($http, $q, _) {
  var _questions = [];

  var _page = [];

  return {
    sync: function() {
      var self = this;
      console.log('Questions: SYNC', _questions);
      var dfd = $q.defer();

      $http.get('/api/sessions')
      .success(function(sessions, length) {
        console.log('Questions: success', sessions, length);
        _page.push(_.sample(sessions, 20));
        _page.push(_.sample(sessions, 20));
        _page.push(_.sample(sessions, 20));
        _questions = _page[self.page];
        dfd.resolve(_questions);
      });


      return dfd.promise;
    },
    page: 0,
    pagination: function(page) {
      return _page[page];
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
