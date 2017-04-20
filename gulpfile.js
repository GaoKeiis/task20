// 引入gulp
var gulp = require("gulp"),
//编译sass
	sass = require("gulp-sass"),
//检测、运行本地web服务器
	server = require("gulp-webserver"),
//压缩js
	uglify = require('gulp-uglify'),
//重命名
	rename = require('gulp-rename'),
//更改版本名  加MD5后缀
	rev = require('gulp-rev'),
	revCollector = require('gulp-rev-collector'),
	minifyHTML   = require('gulp-minify-html');
//编译scss样式添加到css中
gulp.task("sass",function(){
	return gulp.src("sass/*.scss")
		.pipe(sass())
		.pipe(gulp.dest("css/"))
});
//监测本地中的所有scss文件，有改变时就自动编译
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
//更改版本名  加MD5后缀
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