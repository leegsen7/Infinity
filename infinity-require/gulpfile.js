const gulp = require('gulp'),
      sass = require('gulp-sass'),
      clean = require('gulp-clean'),
      rename = require('gulp-rename'),
      concat = require('gulp-concat'),
      cleancss = require('gulp-clean-css'),
      autoprefix = require('gulp-autoprefixer'),
      imagemin = require('gulp-imagemin'),
      imageminPngquant = require('imagemin-pngquant'),
      requirejsOptimize  = require('gulp-requirejs-optimize'),
      browserSync = require('browser-sync').create();

let files = [
    'index.html',
    "dist/css/*css",
    'dist/img/*.{png,ico}',
    'src/js/**/*.js'],
    imgFiles = './src/img/*.{png,ico}',
    jsFiles = './src/js/**/*.js',
    styleFiles = './src/css/*.{scss,css}';

gulp.task('clean',function(){
    gulp.src('./dist')
    .pipe(clean());
});

// Static server
gulp.task('browser-sync', function(){
    browserSync.init(files, {
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('buildcss',function(){
    gulp.src(styleFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('index.min.css'))
    .pipe(autoprefix({
      browsers: ['last 20 versions','Android >= 4.0',"last 4 Explorer versions","iOS >= 7"]
    }))
    .pipe(cleancss({
      keepSpecialComments: '*'
    }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('imagemin',function(){
    gulp.src(imgFiles)
    .pipe(imagemin({
        use:imageminPngquant()
    }))
    .pipe(gulp.dest('./dist/img'));
});
gulp.task('requirejs',function(){
  return gulp.src('./src/js/main.js')
  .pipe(requirejsOptimize({
    paths:{
      // lib
      "angular":"libs/angular.min",
      "angular-route":"libs/angular-route.min",
      'angular-animate':'libs/angular-animate.min',
      "jquery":"libs/jquery.min",
      "angular-toastr":"libs/angular-toastr.min",
      "angular-page":"libs/angular-page",
      // dom
      'start':'dom/start',
      'background':'dom/background',
      'storage':'dom/storage',
      'rightbar':'dom/rightbar',
      'music':'dom/music',
      'slider':'dom/slider',
      'parabola':'dom/parabola',
      // ctrl
      'searchCtrl':'ctrls/searchCtrl',
      'rightbarCtrl':'ctrls/rightbarCtrl',
      'routeCtrl':'ctrls/routeCtrl',
      'infinityCtrl':'ctrls/infinityCtrl',
      'changeCtrl':'ctrls/changeCtrl',
      'bodyCtrl':'ctrls/bodyCtrl',
      'musicCtrl':'ctrls/musicCtrl',
      // directives
      'clickLink':'directives/clickLink',
      'ngRightClick':'directives/ngRightClick',
      // filter
      'filter':'filter/filter',
      // factory
      'service':'factory/service',
    },
    shim:{
        "angular":{
          deps:['jquery'],
            exports:"angular"
        },
        "angular-route":{
            deps: ["angular"],
            exports:"ngRoute",
        },
        'angular-animate':{
          deps:['angular'],
          exports:'ngAnimate',
        },
        'angular-toastr':{
          deps:["angular"],
          export:'toastr',
        },
        'angular-page':{
          deps:['angular'],
          exports:'ngPage',
        },
        'parabola':{
          deps:['jquery'],
          exports:'parabola',
        }
    } 
  }))
  .pipe(gulp.dest('./dist/js/'));
});

gulp.task('copy',function(){
  gulp.src('./src/js/require.min.js')
  .pipe(gulp.dest('./dist/js/'));
});

// 监听文件
gulp.task('watch',function(){
  gulp.watch(styleFiles,['buildcss']);
  gulp.watch(imgFiles,['imagemin']);
});

// 定义默认任务
gulp.task('default',function(){
    gulp.start('buildcss','imagemin','watch');
});

// 打包任务
gulp.task('publish',['clean'],function(){
  setTimeout(function(){
    gulp.start('buildcss','imagemin','copy','requirejs');
  },500);
});