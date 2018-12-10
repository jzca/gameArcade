const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('default', ['copyHTML', 'csswork', 'babel', 'concatUglify','imgmin'], function () {
	gulp.watch('src/index.html', ['copyHTML'])
	gulp.watch('src/css/*.css', ['csswork']);
	gulp.watch("src/js/*.js", ['babel', 'concatUglify'])
	browserSync.init({
		server: 'dist'
	});
});

gulp.task('copyHTML', function () {
	gulp.src('src/index.html')
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream());
});

gulp.task('csswork', () => {
	return gulp.src('src/css/*.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(cleanCSS())
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream())
});

gulp.task('imgmin', () => {
	gulp.src('src/images/*')
		.pipe(imagemin({
			verbose: true
		}))
		.pipe(gulp.dest('dist/images'))
});

gulp.task('babel', () =>
	gulp.src('src/js/app.js')
	.pipe(babel({
		presets: ['@babel/env']
	}))
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.stream())
);

gulp.task('concatUglify', () =>
	gulp.src(['src/js/resources.js', 'dist/js/app.js', 'src/js/engine.js'])
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.stream())
);