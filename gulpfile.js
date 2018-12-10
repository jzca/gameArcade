const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('cssfix',()=> {
	return gulp.src('src/css/*.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
	}))
		.pipe(gulp.dest('dist/css'));
})






