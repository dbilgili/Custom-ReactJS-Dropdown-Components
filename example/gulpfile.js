const gulp = require('gulp');
const stylus = require('gulp-stylus');
const autoprefixer = require('gulp-autoprefixer');

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('stylus', function () {
    return gulp.src('./src/styles/global.styl')
      .pipe(stylus())
      .pipe(autoprefixer('last 2 versions'))
      .on('error', handleError)
      .pipe(gulp.dest('./src/styles/'));
});

gulp.task('watch-stylus', function () {
  gulp.watch('./src/styles/**/*.styl', ['stylus']);
});

gulp.task('default', ['watch-stylus']);
