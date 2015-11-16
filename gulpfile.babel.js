import gulp from 'gulp'
import babel from 'gulp-babel'
import eslint from 'gulp-eslint'
import 'shelljs/global'

gulp.task('eslint', () => {
  gulp.src(['./src/**/*', './tests/test-*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
})

gulp.task('babel', ['eslint'], () => {
  gulp.src('./src/**/*')
    .pipe(babel({stage: 0, optional: ['runtime']}))
    .pipe(gulp.dest('./lib'))
})

gulp.task('mongo', () => {
  exec('sudo mongod')
})

gulp.task('watch', () => {
  gulp.watch('./src/**/*', ['babel'])
})

gulp.task('build', ['babel'])

gulp.task('default', ['build', 'watch', 'mongo'])
