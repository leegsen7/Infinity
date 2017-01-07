var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var cleancss = require('gulp-clean-css');
var amdOptimize = require("amd-optimize"); 
var requirejs = require('gulp-requirejs-simple');
var browserSync = require('browser-sync').create();
// Static server
gulp.task('browser-sync', function() {
    var files = [
        'index.html',
        'dist/css/*.css',
        'dist/img/*.img',
        'js/**/*.js',
    ];
    browserSync.init(files, {
        server: {
            baseDir: "./"
        }
    });
});
gulp.task('cleancss',function(){
    return gulp.src('css/*.css')
        .pipe(concat('index.min.css'))
        .pipe(cleancss())
        .pipe(gulp.dest('dist/css'))
});
// gulp.task('requirejs',function(){
//     return gulp.src("js/**/*.js")
//         .pipe(amdOptimize("main"))   //主入口文件  
//         .pipe(concat("build.min.js"))      //合并后的文件，如何合并后的文件和主入口名一样，构建后便只有一个文件  
//         .pipe(gulp.dest("dist/js"));  //输出目录 
// });

// gulp.task('requirejs', requirejs({
//     baseUrl: 'js',
//     name: 'main',
//     out: 'dist/js/build.min.js',
//     mainConfigFile: 'js/main.js',
//     optimize: 'uglify2',
//     preserveLicenseComments: false,
//     generateSourceMaps: false,
//     paths: {
//         templates: '../../templates'
//     }
// }));
// 监听css文件
gulp.task('watch',function(){
    gulp.watch('css/*.css',['cleancss']);
    // gulp.watch('js/**/*.js',['requirejs']);
})
gulp.task('default', ['cleancss','watch','browser-sync']); //定义默认任务
