const path = require('path');
const spawn = require('child_process').spawn;

const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const config = require('./env/dev')();

gulp.task('three:concat', () =>
  gulp
    .src(
      ['three.js', 'inflate.min.js', 'FBXLoader.js', 'OrbitControls.js', 'Detector.js'].map(filename =>
        path.join('three', 'libs', filename)
      )
    )
    .pipe(sourcemaps.init())
    .pipe(concat('three.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.join(config.folders.public, 'libs')))
);

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
  gulp.watch('three/libs/*.js', gulp.series(['three:concat']));
});

gulp.task('dev', gulp.parallel(['engine:concat', 'engine:watch', 'three:concat']));

gulp.task('serve', done => {
  spawn('node', ['index.js'], { stdio: 'inherit' });
  done();
});

gulp.task('start', gulp.parallel(['dev', 'serve']), done => done());
