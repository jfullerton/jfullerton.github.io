const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

// compile scss into css
function style() {
  return gulp.src('./swrpg/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./swrpg/css'))
    .pipe(rename({ suffix: ".min"}))
    .pipe(postcss([
      autoprefixer({ cascade: false }), // "browserslist" defined in package json
      cssnano()
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./swrpg/css'));
}

function watch() {
  gulp.watch('./swrpg/scss/**/*.scss', style);
}

exports.style = style;
exports.watch = watch;

gulp.task('default', watch);
