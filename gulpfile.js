var gulp   = require('gulp');
var ngmin  = require('gulp-ngmin');
var gutil  = require('gulp-util');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var refresh    = require('gulp-livereload');
var livereload = require('tiny-lr');

var server = livereload();

var config = {
  livereload: {
    port: 35729
  },
  path: {
    scripts: [
      'client/modules/index.js',
      'client/modules/*.js',
      'client/directives/index.js',
      'client/directives/*.js',
      'client/filters/index.js',
      'client/filters/*.js',
      'client/services/index.js',
      'client/services/*.js',
      'client/controllers/index.js',
      'client/controllers/*/*.js',
      'client/controllers/*.js',
      'client/app.js',
      'client/config.js',
      'client/routes.js',
      '!client/styles',
      '!client/templates/'
    ],
    styles: [
      'public/stylesheets/*.css'
    ],
    stylus: [
      'client/styles/index.styl'
    ],
    images: 'public/images/*.{png,jpg,gif}',
    html: 'public/*.{html,ejs}'
  },
  build: {
    script: 'scripts.js',
    style: 'styles.css',
    scripts: 'public/javascripts',
    styles: 'public/stylesheets'
  },
  uglify: {
    mangle: false,
    output: {
      'indent_level': 2
    }
  }
};

gulp.task('scripts', function(cb) {
  return gulp.src(config.path.scripts)
    .pipe(ngmin())
    // .pipe(uglify(config.uglify))
    .pipe(concat(config.build.script))
    .pipe(gulp.dest(config.build.scripts))
    .pipe(refresh(server));
});

gulp.task('styles', function(cb) {
  return gulp.src(config.path.styles)
    .pipe(refresh(server));
});

gulp.task('html', function(cb) {
  return gulp.src(config.path.html)
    .pipe(refresh(server));
});

gulp.task('stylus', function(cb) {
  return gulp.src(config.path.stylus)
    .pipe(stylus({ conpress: true }))
    .pipe(concat(config.build.style))
    .pipe(gulp.dest(config.build.styles))
    .pipe(refresh(server));
});

gulp.task('uglify', function(cb) {
  return gulp.src(config.path.scripts)
    .pipe(uglify(config.uglify))
    .pipe(gulp.dest(config.build.path));
});

gulp.task('lr-server', function(cb) {

  server.listen(config.livereload.port, function(err) {
    if (err) return console.log(err);
  });

});

gulp.task('watch', function(cb) {

  gulp.watch(config.path.scripts, function(event) {
    gulp.run('scripts');
  });

  gulp.watch(config.path.styles.concat(config.path.stylus), function(event) {
    gulp.run('styles', 'stylus');
  });

  gulp.watch(config.path.html, function(event) {
    gulp.run('html');
  });

});

gulp.task('build', function(cb) {
  gulp.run('scripts', 'styles', 'stylus', 'html');
});


gulp.task('default', function(cb) {
  gulp.run('lr-server', 'build', 'watch');
});
