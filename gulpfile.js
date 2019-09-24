const gulp = require('gulp'),
      browserSync = require('browser-sync').create(),
      stylus = require('gulp-stylus'),
      sourcemaps = require('gulp-sourcemaps'),
      clean = require('gulp-clean'),
      jade = require('gulp-jade');

gulp.task('clean', function(){
  return gulp.src(['static/*'], {read:false})
  .pipe(clean());
});

gulp.task('compile-jade', () => {
  let YOUR_LOCALS = {};

  gulp.src('./src/pages/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest("static/pages"))
    .pipe(browserSync.stream());
});

gulp.task('compile-stylus', () => {
    return gulp.src('src/stylus/*.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus({
            compress: true,
            'include css': true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("static/css"))
        .pipe(browserSync.stream());
});

gulp.task('js', () => {
    return gulp.src([
            'node_modules/jquery/dist/jquery.min.js'
        ])
        .pipe(gulp.dest("static/js"))
        .pipe(browserSync.stream());
});

gulp.task('assets', () => {
    gulp.src('src/assets/*')
        .pipe(gulp.dest('static/assets'))
        .pipe(browserSync.stream());
});

gulp.task('serve', ['compile-stylus'], () => {

    browserSync.init({
        server: "."
    });

    gulp.watch(
        ['src/stylus/*.styl', 'src/pages/*.jade'],
        ['compile-stylus', 'compile-jade']
    );
    gulp.watch("static/pages/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['assets', 'js','serve']);
gulp.task('build', ['clean', 'assets', 'js', 'compile-stylus', 'compile-jade'])
