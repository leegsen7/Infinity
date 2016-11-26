var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var cleancss = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
// Static server
gulp.task('browser-sync', function() {
    var files = [
        '*.html',
        'dist/css/*.css',
        'dist/img/*.img',
        'js/*.js',
        'js/*/*.js',
    ];
    browserSync.init(files, {
        server: {
            baseDir: "./"
        }
    });
});
gulp.task('cleancss',function(){
    return gulp.src('css/*.css')
        .pipe(concat('index.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({suffix:'.min'}))
        .pipe(cleancss())
        .pipe(gulp.dest('dist/css'))
});
// 监听css文件
gulp.task('watch',function(){
    gulp.watch('css/*.css',['cleancss']);
})
gulp.task('default', ['cleancss','watch']); //定义默认任务
