'use strict';

/* Services */
angular.module('app.services')
.factory('Questions', function($http, $q, _) {

  var _questions = [];
  var _pages = [];

  var cache = {};
  return {
    sync: function() {
      var self = this;
      console.log('Questions: SYNC', _questions);
      var dfd = $q.defer();
      if (!cache[_pages.length]) {
        cache[_pages.length] = $http.get('/api/sessions')
        .success(function(sessions, length) {
          console.log('Questions: success', sessions, length);
          _pages['0'] = (sessions.slice(0, 20));
          _pages['1'] = (sessions.slice(20, 40));
          _pages['2'] = (sessions.slice(40, 60));
          _pages['3'] = (sessions.slice(80, 100));
          _questions = _pages[self.page];
          dfd.resolve(_questions);
        });
      } else {
        dfd.resolve(cache[_pages.length]);
      }


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
    getReduced: function() {
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
