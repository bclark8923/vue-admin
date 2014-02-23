'use strict';

var database = {
  sessions: require('./sessions.json')
};

module.exports = function(app, config) {
  console.log(config);
  var databaseUrl = config.mongoDB;
  var collections = ["questions"]
  var db = require("mongojs").connect(databaseUrl, collections);

  var DB = {
    get: function(data) {
      return database[data];
    },
    sessions: function() {
      return database.sessions;
    },
    questions: function() {
      return db.questions;
    }
  };

  console.log('Database Initialized');

  return DB;
};
