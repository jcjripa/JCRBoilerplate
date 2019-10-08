const gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  imagemin = require('gulp-imagemin'),
  uglify = require('gulp-uglify-es').default,
  cssnano = require('gulp-cssnano'),
  htmlmin = require('gulp-htmlmin'),
  babel = require('gulp-babel');


let paths = {

  data: {
    src: 'src/data/**/*.*',
    dest: 'public/data/'
  },
  scss: {
    src: 'src/scss/**/*.scss',
    dest: 'public/css/'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'public/js/'
  },
  pages: {
    src: 'src/pages/**/*.html',
    dest: 'public/'
  },
  media: {
    src: 'src/media/**/*.*',
    dest: 'public/media/'
  }
};

function data() {
  return gulp.src(paths.data.src)
    .pipe(gulp.dest(paths.data.dest))
    .pipe(browserSync.stream());

}

function pages() {
  return gulp.src(paths.pages.src)
    .pipe(gulp.dest(paths.pages.dest))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(browserSync.stream());
}

function scss() {
  return gulp.src(paths.scss.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(browserSync.stream());
}

function images() {
  return gulp.src(paths.media.src)
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      }),
      imagemin.svgo({
        plugins: [{
            removeViewBox: false
          },
          {
            cleanupIDs: false
          }
        ]
      })
    ]))
    .pipe(gulp.dest(paths.media.dest))
    .pipe(browserSync.stream());

}

function scripts() {
  return gulp.src(paths.scripts.src, {
      sourcemaps: true
    })
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./public/"
    }
  });
  gulp.watch(paths.pages.src, pages);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.scss.src, scss);
  gulp.watch(paths.media.src, images);
  gulp.watch(paths.data.src, data);
  gulp.watch([paths.pages.dest, paths.data.dest, paths.scripts.dest, paths.scss.dest, paths.media.dest]).on('change', browserSync.reload);
}


exports.pages = pages;
exports.scss = scss;
exports.images = images;
exports.scripts = scripts;
exports.watch = watch;
exports.data = data;


let build = gulp.series(gulp.parallel(pages, data, scss, images, scripts, watch));
gulp.task('default', build);