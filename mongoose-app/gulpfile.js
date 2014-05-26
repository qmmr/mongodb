'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('eslint', function () {
    return gulp.src([
            '**/*.js',
            '!node_modules/**/*.js'
        ])
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('watch', function () {
    gulp.watch(['**/*.js', '!node_modules/**/*.js'], ['eslint']);
});

gulp.task('default', ['eslint']);
