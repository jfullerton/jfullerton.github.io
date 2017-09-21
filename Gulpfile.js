// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    bytediff = require('gulp-bytediff'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    rename = require('gulp-rename'),
    del = require('del');

// Styles
gulp.task('styles', function() {
  gulp.src('./swrpg/scss/*.scss')
    .pipe(sass({
        outputStyle: "compact"
      })
      .on('error', function(err) { console.log(err.messageFormatted); console.log('\u0007'); })
    ) 
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    ]))
    .pipe(gulp.dest('./swrpg/css'))
    .pipe(rename({suffix:'.min'}))
    .pipe(bytediff.start())
    .pipe(postcss([cssnano()]))
    .pipe(bytediff.stop())
    .pipe(gulp.dest('./swrpg/css'));
});

// Clean build
gulp.task('clean', function() {
    del(['./swrpg/css']); // remove compiled CSS directory
    gulp.start('styles'); // do styles build
});

// Default task
  gulp.task('default', ['watch']);

// Watch
gulp.task('watch',function() {

  // Watch for file changes
  gulp.watch('./swrpg/scss/**/*.scss', ['styles']);
});