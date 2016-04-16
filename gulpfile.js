/* jshint node:true */
'use strict';
// generated on 2015-01-04 using generator-gulp-webapp 0.2.0
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

const reload = browserSync.reload;

gulp.task('styles', function() {
  return gulp.src('app/styles/*.scss')
    // .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 1 version']
    }))
    // .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'));
  // .pipe(reload({stream: true}));
});

gulp.task('lint', function() {
  return gulp.src('app/scripts/**/*.js')
    .pipe(reload({
      stream: true,
      once: true
    }))
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
});

gulp.task('html', ['styles'], function() {
  return gulp.src('app/*.html')
      .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
      .pipe($.if('*.js', $.uglify()))
      .pipe($.if('*.css', $.cssnano()))
      .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
      .pipe(gulp.dest('dist'));

  // var assets = $.useref.assets({
  //   searchPath: '{.tmp,app}'
  // });
  // return gulp.src('app/*.html')
  //   .pipe(assets)
  //   .pipe($.if('*.js', $.uglify()))
  //   .pipe($.if('*.css', $.csso()))
  //   .pipe(assets.restore())
  //   .pipe($.useref())
  //   .pipe($.if('*.html', $.minifyHtml({
  //     conditionals: true,
  //     loose: true
  //   })))
  //   .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('songs', function() {
  return gulp.src('assets/songs/*.mp3').pipe(gulp.dest('dist/songs'));
});

gulp.task('fonts', function() {
  return gulp.src(require('main-bower-files')().concat('app/fonts/**/*'))
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('woffcss', function() {
  return gulp.src('app/styles/*.woff.css')
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('extras', function() {
  return gulp.src([
    'app/*.*',
    '!app/*.html',
    'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('connect', ['styles'], function() {
  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');
  var app = require('connect')()
    .use(require('connect-livereload')({
      port: 35729
    }))
    .use(serveStatic('.tmp'))
    .use(serveStatic('app'))
    // paths to bower_components should be relative to the current file
    // e.g. in app/index.html you should use ../bower_components
    .use('/bower_components', serveStatic('bower_components'))
    .use(serveIndex('app'));

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function() {
      console.log('Started connect web server on http://localhost:9000');
    });
});

gulp.task('serve', ['connect', 'watch'], function() {
  require('opn')('http://localhost:9000');
});

// inject bower components
gulp.task('wiredep', function() {
  var wiredep = require('wiredep').stream;

  gulp.src('app/styles/*.scss')
    .pipe(wiredep())
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep())
    .pipe(gulp.dest('app'));
});

gulp.task('watch', ['connect'], function() {
  $.livereload.listen();

  // watch for changes
  gulp.watch([
    'app/*.html',
    '.tmp/styles/**/*.css',
    'app/scripts/**/*.js',
    'app/images/**/*'
  ]).on('change', $.livereload.changed);

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'songs', 'extras', 'woffcss'], function() {
  return gulp.src('dist/**/*').pipe($.size({
    title: 'build',
    gzip: true
  }));
});

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});
