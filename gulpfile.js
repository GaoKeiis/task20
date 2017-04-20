// ����gulp
var gulp = require("gulp"),
//����sass
	sass = require("gulp-sass"),
//��⡢���б���web������
	server = require("gulp-webserver"),
//ѹ��js
	uglify = require('gulp-uglify'),
//������
	rename = require('gulp-rename'),
//���İ汾��  ��MD5��׺
	rev = require('gulp-rev'),
	revCollector = require('gulp-rev-collector'),
	minifyHTML   = require('gulp-minify-html');
//����scss��ʽ��ӵ�css��
gulp.task("sass",function(){
	return gulp.src("sass/*.scss")
		.pipe(sass())
		.pipe(gulp.dest("css/"))
});
//��Ȿ���е�����scss�ļ����иı�ʱ���Զ�����
gulp.task("server",function(){
	gulp.watch("sass/*.scss",["sass"]);
	return gulp.src("./")
		.pipe(server({
			livereload:true,
			directoryListing:true,
			open:true
		}));
});

gulp.task("uglify",function(){
	gulp.src("js/app.js")
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest("js/"))
});
//���İ汾��  ��MD5��׺
gulp.task('rev',function(){
	return gulp.src(['css/music.css',"js/app.min.js"])
		.pipe(rev())
		.pipe(gulp.dest('aggregate/'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('./'));

});
gulp.task("revCollector",function(){
	return gulp.src(['rev-manifest.json',"music.html"])
		.pipe(revCollector({
			replaceReved: true,
			dirReplacements: {
				'css': 'aggregate/',
				'js': 'aggregate/'
			}
		}))
		.pipe( minifyHTML({
			empty:true,
			spare:true
		}) )
		.pipe( gulp.dest('./') );
});
gulp.task("default",["sass","server","rev","revCollector","uglify"]);