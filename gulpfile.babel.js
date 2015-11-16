import gulp from 'gulp'
import babel from 'gulp-babel'
import 'shelljs/global'

gulp.task('babel', () => {
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
