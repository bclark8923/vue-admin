'use strict';
var database = {
  sessions: require('./sessions.json')
};

module.exports = function(app, config) {
  var DB = {
    get: function(data) {
      return database[data];
    },
    sessions: function() {
      return database.sessions;
    }
  };

  console.log('Database Initialized');

  return DB;
};
