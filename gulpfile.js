const path = require('path');
const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const config = require('./env/dev')();

gulp.task('engine:scss', () =>
  gulp
    .src('./engine/scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.folders.public))
);

gulp.task('engine:concat', () =>
  gulp
    .src('engine/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('engine.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.folders.public))
);

gulp.task('engine:watch', () => {
  gulp.watch('engine/**/*.js', gulp.series(['engine:concat']));
  gulp.watch('engine/**/*.js', gulp.series(['engine:scss']));
});

gulp.task('dev', gulp.parallel(['engine:concat', 'engine:scss', 'engine:watch'], done => done()));
