const gulp = require('gulp');
const lesshint = require('gulp-lesshint');
const less = require('gulp-less');

gulp.task('lint', () => {
    return  gulp.src('less/*.less')
            .pipe( lesshint({}) )
            .pipe( lesshint.reporter() ) 
            .pipe( lesshint.failOnError() ) 
            //.pipe(lesshint.failOnWarning());
});

gulp.task('styles', () => {
    return  gulp.src('less/*.less')
            .pipe( less() )
            .pipe( gulp.dest('css/') );
});

exports.default = gulp.series( gulp.task('lint'), gulp.task('styles') );