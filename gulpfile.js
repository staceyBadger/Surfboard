const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require( 'gulp-rm' );
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const {DIST_PATH, SRC_PATH, STYLES_LIBS, JS_LIBS} = require('./gulp.config');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

task( 'clean', () => {
    return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm());
  });

task("copy:html", () => {
    return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({stream: true}));
});
task("copy:img", () => {
  return src(`${SRC_PATH}/img/*.png`)
  .pipe(dest(`${DIST_PATH}/img`))
  .pipe(reload({stream: true}));
});
task("copy:svg", () => {
  return src(`${SRC_PATH}/img/*.svg`)
  .pipe(dest(`${DIST_PATH}/img`))
  .pipe(reload({stream: true}));
});
task("copy:mp4", () => {
  return src(`${SRC_PATH}/*.mp4`)
  .pipe(dest(DIST_PATH))
  .pipe(reload({stream: true}));
});


task("styles", () => {
  return src([...STYLES_LIBS, 'src/css/main.scss'])
  .pipe(gulpif(env === 'dev', sourcemaps.init()))
  .pipe(concat('main.min.scss'))
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  //.pipe(px2rem())
  .pipe(gulpif(env === 'prod', 
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
})))
  .pipe(gulpif(env === 'prod', gcmq()))
  .pipe(gulpif(env === 'prod', cleanCSS()))
  .pipe(gulpif(env === 'dev', sourcemaps.write()))
  .pipe(dest(DIST_PATH))
  .pipe(reload({stream: true}));
});


task('scripts', () => {
  return src([...JS_LIBS, "src/scripts/*.js"])
  .pipe(gulpif(env === 'dev', sourcemaps.init()))
  .pipe(concat('main.min.js', {newLine: ";"}))
  .pipe(gulpif(env === 'prod', babel({
    presets: ['@babel/env']
  })))
  .pipe(gulpif(env === 'prod', uglify()))
  .pipe(gulpif(env === 'dev', sourcemaps.write()))
  .pipe(dest(DIST_PATH))
  .pipe(reload({stream: true}));
});

task("icons", () => {
  return src('src/img/icons/*.svg')
    .pipe(svgo({
      plugins: [
        {
          removeAttrs: {
            attrs: "(fill|stroke|style|width|height|data.*)"
          }
        }
      ]
    })
    )
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "../sprite.svg"
        }
      }
    }))
    .pipe(dest("dist/img"));
});

task('server', () => {
  browserSync.init({
      server: {
          baseDir: "./dist"
      }
  });
});


task('watch', () => {
  watch('./src/css/**/*.scss', series("styles"));
  watch('./src/*.html', series("copy:html"));
  watch('./src/scripts/*.js', series('scripts'));
  watch('./src/img/icons/*.svg', series('icons'));
  watch('./src/img/*.png', series('copy:img'));
  watch('./src/img/*.svg', series('copy:svg'));
  watch('./src/*.mp4', series('copy:mp4'));
});




task('default',
 series(
   'clean',
   parallel('copy:html', 'copy:img', 'styles', 'scripts', 'icons', 'copy:svg', 'copy:mp4'),
   parallel('watch', 'server')
 )
);
task('build',
 series('clean', parallel('copy:html', 'copy:img', 'copy:svg', 'styles', 'scripts', 'icons', 'copy:mp4'))
);