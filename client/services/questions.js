'use strict';

/* Services */
angular.module('app.services')
.factory('Questions', function($http, $q, _) {

  var _questions = [];
  var _pages = [];
  var _reduced = [];
  var _filterReduced = [];
  var cache = {};


  return {
    sync: function() {
      var self = this;
      console.log('Questions: SYNC', _questions);
      var dfd = $q.defer();
      if (!cache[_pages.length]) {
        $http.get('/api/sessions')
        .success(function(sessions, length) {
          console.log('Questions: success', sessions, length);
          _pages['0'] = (sessions.slice(0, 20));
          _pages['1'] = (sessions.slice(20, 40));
          _pages['2'] = (sessions.slice(40, 60));
          _pages['3'] = (sessions.slice(80, 100));
          _questions = sessions;//_pages[self.page];
          cache[_pages.length] = _questions;

          _reduced = sessions.reduce(function (result, o) {
            var unit = o.deviceID;

            if (!(unit in result)) {
              result.arr.push(result[unit] = {
                deviceID: unit,
                sessionTime: o.time,
                sessions: 1
              });

            } else {

              result[unit].sessionTime += o.time;
              result[unit].sessions += 1;

            }

            return result;
          }, { arr: [] }).arr;

          _filterReduced = sessions.reduce(function (result, o) {
            var unit = o.deviceID;

            for( var i = 0; i < o.interactions.length; i++) {
              if(o.interactions[i].object === 'UIButton' && o.interactions[i].page === 'FoodLog' && o.interactions[i].name === 'Add Food') {
                return result;
              }
            }
            if (!(unit in result)) {
              result.arr.push(result[unit] = {
                deviceID: unit,
                sessionTime: o.time,
                sessions: 1
              });

            } else {

              result[unit].sessionTime += o.time;
              result[unit].sessions += 1;

            }

            return result;
          }, { arr: [] }).arr;

          dfd.resolve(cache[_pages.length]);
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
      console.log('QuestionsReduced: GET', _reduced);
      return _reduced;
    },
    filter: function() {
      console.log('filterReduced', _filterReduced);
      return _filterReduced;
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
