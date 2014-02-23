'use strict';
var _ = require('underscore');
var database = {
  sessions: require('./sessions.json')
};
_.each(database.sessions, function(session) {
  session.interactionsTree = session.interactionsTree || [];
  var previous = null;
  session.interactions.forEach(function(interaction) {
    if (interaction.page !== previous) {
      session.interactionsTree.push(interaction.page);
    }
    previous = interaction.page;
  });
});

module.exports = function(app, config) {
  console.log(config);
  var databaseUrl = config.mongoDB;
  var collections = ['questions'];
  var db = require('mongojs').connect(databaseUrl, collections);

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
