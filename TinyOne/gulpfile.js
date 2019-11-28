var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');

gulp.task('browser-sync', async function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});
  
gulp.task('sass', async function(){
  gulp.src('app/scss/**/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('app/css/'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('code', function() {
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('scripts', function() {
    return gulp.src('app/js/index.js')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('app/*.html', gulp.parallel('code')); 
    gulp.watch('app/js/index.js', gulp.parallel('scripts'));
    // Other watchers
  })

gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));