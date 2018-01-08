//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
  less = require('gulp-less');

gulp.task('styleTransform', function () {
  gulp.src('./server/public/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./server/public/css'));
});

gulp.task('styleWatch', function () {
  gulp.watch('./server/public/less/*', ['styleTransform']); //当所有less文件发生改变时，调用testLess任务
});