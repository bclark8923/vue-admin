'use strict';
var sessions = require('./sessions.json');
module.exports = function(app, config) {
  var DB = {
    sessions: function() {
      return sessions;
    }
  };

  console.log('Database Initialized');

  return DB;
};
