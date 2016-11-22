var gulp = require('gulp');
// var cleancss = require('gulp-clean-css');
// var rename = require('gulp-rename');
// var imagemin = require('gulp-imagemin');
// var pngquant = require('imagemin-pngquant');
var browserSync = require('browser-sync').create();
// 自动刷新
gulp.task('browser-sync', function() {
    var files = [
        '*.html',
        '**/*.css',
        '**/*.js',
        'img/*.png',
    ];
    browserSync.init(files, {
        server: {
            baseDir: "./"
        }
    });
});
// 压缩css
// gulp.task('clean-css',function(){
//     return gulp.src('css/index.css')
//         .pipe(rename({suffix:'.min'}))
//         .pipe(cleancss())
//         .pipe(gulp.dest('dist/css'));
// });
// // 压缩img
// gulp.task('image-min', function () {
//     gulp.src('img/*.{png,gif,jpg,jpeg}')
//         .pipe(imagemin({
//             // optimizationLevel: 7, //类型：Number  默认：3  取值范围：0-7（优化等级）
//             progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
//             // interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
//             // multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
//             use: [pngquant()]
//         }))
//         .pipe(gulp.dest('dist/img'));
// });
// // 文件监听
// gulp.task('watch',function(){
//     // 监听css文件
//     gulp.watch('css/index.css',function(){
//         gulp.run('clean-css');
//     });
//     // 监听img文件
//     gulp.watch('img/*.{png,gif,jpg,jpeg}',function(){
//         gulp.run('image-min');
//     })
// })

gulp.task('default', ['browser-sync']); //定义默认任务
