var gulp = require('gulp');
var del = require('del');
var replace = require('gulp-replace');//文件路径替换

gulp.task('clean', del.bind(null, ['publish']));
gulp.task('replace', function () {
    return gulp.src('./dist/index.html')
    //静态资源路径替换
            .pipe(replace('/static/', '/page/static/'))
            .pipe(gulp.dest('./publish'))
})
//考钡构建后的ＪＳ，ＣＳＳ文件
gulp.task('default', ['replace'], function () {
    return gulp.src(['./static/**/*.*'])
            .pipe(gulp.dest('./dist/static'))
})