
    const gulp = require('gulp'),
          browserSync= require('browser-sync').create(),
          autoprefixer = require('gulp-autoprefixer'),
          sass = require('gulp-sass'),
          concat = require('gulp-concat'),
          imagemin = require('gulp-imagemin'),
          uglify = require('gulp-uglify-es').default,
          rename = require('gulp-rename'),
          cleanCSS = require('gulp-clean-css'),
          del = require('del')


    let paths = {

      data:{
        src:'src/data/**/*.*',
        dest:'public/data/'
      },
      scss: {
        src: 'src/scss/**/*.scss',
        dest: 'public/css/'
      },
      scripts: {
        src: 'src/js/**/*.js',
        dest: 'public/js/'
      },
      pages:{
        src:'src/pages/**/*.html',
        dest:'public/'
      },
      media: {
        src: 'src/media/**/*.*',
        dest:'public/media/'
      }
    };

    function clean() {
      return del([ 'assets' ]);
    }
    function data(){
      return gulp.src(paths.data.src)
        .pipe(gulp.dest(paths.data.dest));
    }
    function pages(){
      return gulp.src(paths.pages.src)
        .pipe(gulp.dest(paths.pages.dest));
    }
    function scss() {
      return gulp.src(paths.scss.src)
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(cleanCSS())
        .pipe(rename({
          basename: 'main',
          suffix: '.min'
        }))
        .pipe(gulp.dest(paths.scss.dest));
    }
    function images(){
      return gulp.src(paths.media.src)
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest(paths.media.dest));
    }
    function scripts() {
      return gulp.src(paths.scripts.src, { sourcemaps: true })
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(paths.scripts.dest));
    }

    function watch() {
      browserSync.init({
        server: {
          baseDir: "./public/"
        }
      });
      gulp.watch(paths.pages.src,pages);
      gulp.watch(paths.scripts.src, scripts);
      gulp.watch(paths.scss.src, scss);
      gulp.watch(paths.media.src, images) ;
      gulp.watch(paths.data.src, data);
      gulp.watch([paths.pages.dest,paths.data.dest, paths.scripts.dest, paths.scss.dest, paths.media.dest]).on('change',browserSync.reload);
    }

   exports.clean = clean;
   exports.pages = pages;
   exports.scss = scss;
   exports.images = images;
   exports.scripts = scripts;
   exports.watch = watch;
   exports.data = data;


  let build = gulp.series(clean, gulp.parallel(pages,data,scss,images, scripts,watch));
  gulp.task('default',build);