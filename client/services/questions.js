'use strict';

/* Services */
angular.module('app.services')
.factory('Questions', function($http, $q, _) {

  var _questions = [];
  var _pages = [];

  return {
    sync: function() {
      var self = this;
      console.log('Questions: SYNC', _questions);
      var dfd = $q.defer();

      $http.get('/api/sessions')
      .success(function(sessions, length) {
        console.log('Questions: success', sessions, length);
        _pages.push(_.sample(sessions, 20));
        _pages.push(_.sample(sessions, 20));
        _pages.push(_.sample(sessions, 20));
        _questions = _pages[self.page];
        dfd.resolve(_questions);
      });


      return dfd.promise;
    },
    pages: function() {
      return _pages;
    },
    page: 0,
    pagination: function(page) {
      return _pages[page];
    },
    countries: function(page) {
      var self = this;
      var countries = {};
      _.each(self.pagination(page), function(obj) {
        countries[obj.country] = (!countries[obj.country]) ? 1 : ++countries[obj.country];
      });
      return countries;
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
