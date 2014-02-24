var NODE_ENV = process.env.NODE_ENV = (process.env.NODE_ENV || 'production');
var PORT        = process.env.PORT = (process.env.PORT || 3000);
var _           = require('underscore');
var express     = require('express');
var stylus      = require('stylus');
var path        = require('path');
var cors        = require('cors');
var config      = require('./config.json')[NODE_ENV];
var mongodb     = require('mongodb');
var mongoose    = require('mongoose');
var path        = require('path');
var fs          = require('fs');


var db = mongoose.connect(config.mongoDB);




module.exports = function(SERVER_ROOT) {
  var app = express();
  app.directory = SERVER_ROOT;
  var database = require('../database')(app, config);

  // Store all environment variables
  app.set('port', PORT);
  app.set('env', NODE_ENV);

  app.configure(function() {
    // App middleware
    app.use(cors());
    app.set('view engine', 'ejs');
    app.set('views', path.join(app.directory, 'client'));
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({secret: 'kaejsyfgkug372tyriuwygfi76trasuydgfi672g34i7fyologjdsu7fgt6783iw7fgwejtyfrd7i682f3fvwjtafwe4'}));
    // app.use(express.session());
    app.use('/bower_components', express.static(path.join(app.directory, 'bower_components')));
    app.use('/templates', express.static(path.join(app.directory, 'client/templates')));
    app.use(express.static(path.join(app.directory, 'public')));
    app.use(app.router);
    app.use(stylus.middleware({
      src: app.directory + '/client/styles',
      dest: app.directory + '/public/stylesheets',
      compile: function(str, path, fn) {
        stylus(str)
        .set('filename', path)
        .set('compress', true)
        .render(fn);
      }
    }));
  });



  // Bootstrap models
  var models_path = path.join(__dirname, '..', 'models');
  var walk = function(path) {
      fs.readdirSync(path).forEach(function(file) {
          var newPath = path + '/' + file;
          var stat = fs.statSync(newPath);
          if (stat.isFile()) {
              if (/(.*)\.(js$|coffee$)/.test(file)) {
                  require(newPath);
              }
          } else if (stat.isDirectory()) {
              walk(newPath);
          }
      });
  };
  walk(models_path);







  app.get('/api/device/:deviceID', function(req, res) {
    console.log('Device: ', req.params.deviceID);

    var response = {askUser:false};
    database.questions().find({deviceID: req.params.deviceID + '', asked: false}, function(err, questions) {
      if( err || questions.length === 0) {
        console.log('no questions found');
        return res.json(response);
      }
      else {
        console.log('questions found');
        questions.forEach( function(question) {
          //console.log(question);
          response = {
            askUser: true,
            question: questions[0].question,
            id: question._id
          };
          database.questions().update({_id:question._id}, {$set: {asked: true}}, function(err, saved) {
            if( err || !saved ) {
              console.log('question not saved');
            } else {
              console.log('question saved');
            }
          });
          return res.json(response);
        } );
      }
    });
  });

  app.get('/api/sessions', function(req, res) {
    console.log('Sessions: ');
    var sessions = database.get('sessions');

    return res.json(sessions);

  });

  app.get('/api/sessions/:sessionID', function(req, res) {
    console.log('Sessions: ');
    var sessions = database.get('sessions');
    var session = _.findWhere(sessions, {sessionID: +req.params.sessionID});
    console.log('session', session);
    return res.json(session);

  });

  app.post('/api/questions/:questionID', function(req, res) {
    console.log('QuestionID: ', req.params.questionID);
    console.log('Answer: ', req.body.answer);
    var ObjectID = mongodb.ObjectID;

    database.questions().update({_id:new ObjectID(req.params.questionID)}, {$set: {answer: req.body.answer}}, function(err, saved) {
      if( err || !saved ) {
        console.log('answer not saved');
        return res.json({
          success: false
        });
      } else {
        console.log('answer saved');
        return res.json({
          success: true
        });
      }
    });
  });

  app.post('/api/questions', function(req, res) {
    console.log('Question: ', req.body.message, req.body.devices);

    req.body.devices.forEach(function(deviceID) {
      console.log(deviceID);
      var obj = {
        deviceID: deviceID,
        question: req.body.message,
        asked: false,
        answer: ''
      };

      database.questions().save(obj, function(err, saved) {
        if( err || !saved ) {
          console.log('User not saved');
        } else {
          console.log('User saved');
        }
      });
    });

    return res.json({
      success: true
    });

  });

  app.get('/api/questions', function(req, res) {
    console.log('Get Questions');
    database.questions().find(null, function(err, questions) {
      if( err || !questions ) {
        console.log('Questions not found');
        return res.json({
          success: true
        });
      } else {
        console.log('Questions found');
        return res.json(questions);
      }
    });

  });


  app.get('/*', function(req, res) {
    return res.render('index', {env: app.get('env')});
  });

  return app;
};
