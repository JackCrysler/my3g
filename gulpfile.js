var gulp = require('gulp');
var minifycss = require('gulp-clean-css');
var scss = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
// 静态服务器 + 监听 scss/html 文件
gulp.task('server', ['sass'], function() {
    browserSync.init({
        server: {baseDir:'./'}
    });

    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("main.scss", ['sass']);
    gulp.watch("js/*.js").on('change', reload);
    gulp.watch("main.js").on('change', reload);
    gulp.watch("pages/*.html").on('change', reload);
    gulp.watch("index.html").on('change', reload);
});

gulp.task('sass',function(){
    return gulp.src('main.scss')
        .pipe(sourcemaps.init())
    	.pipe(scss())
        .on('error',function(err){
            console.log(err.message);
        })
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
        .pipe(reload({stream:true}));
});

