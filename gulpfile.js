var gulp = require('gulp');
var tinypng = require('gulp-tinypng-compress');
var webserver = require('gulp-webserver');
var os=require('os');
var ifaces=os.networkInterfaces();
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-minify-css');
var clean = require('gulp-clean');
var ftp = require('gulp-ftp');
var gutil = require('gulp-util');
var lazypipe = require('lazypipe');
var gulpwatch = require('gulp-watch');
var cheerio = require('gulp-cheerio');
var path = require('path');


var buildConfig = require('./package.json').buildConfig;


gulp.task('tinypng', function () {
	var imageName = '';
	var src = '';
	if(process.argv[3] && process.argv[3]=='-p' && process.argv[4]){
		imageName = process.argv[4];	//获取图片名称
		if(/(\.png|\.jpg|\.jpeg)$/.test(imageName)){
			src = 'app/'+buildConfig.projectName+'/images/'+imageName;
		}
	} else {
		src = 'app/'+buildConfig.projectName+'/images/**/*.{png,jpg,jpeg}';	//默认images文件夹下全部图片
	}

	gulp.src(src)
		.pipe(tinypng({
			key: buildConfig.tinypngKey,
			log: true
		}))
		.pipe(gulp.dest('app/'+buildConfig.projectName+'/images'));
});

gulp.task('server', function() {
	gulp.src(buildConfig.server.path)
		.pipe(webserver({
			host: getIP(),
			directoryListing: {enable:true, path: buildConfig.server.path},
			livereload: false,
			open: true,
			port: buildConfig.server.port || 8001
		}));
});

gulp.task('sass', function(){
	gulp.src('app/'+buildConfig.projectName+'/styles/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('app/'+buildConfig.projectName+'/styles'))
})

gulp.task('sass:watch', function(){
	// return gulpwatch('app/styles/*.scss', function(vinyl){
	// 	console.log(vinyl.path)
	// })
	// 	.pipe(sass().on('error', sass.logError))
	// 	.pipe(gulp.dest('app/styles'));
	return gulp.watch('app/'+buildConfig.projectName+'/styles/*.scss', ['sass'])
})

var buildHTML = lazypipe()
	.pipe(replace, /"(\.\/)?(images|css|js|scripts|styles)\/([^"]+?)"/gm, '"'+ buildConfig.basePath + buildConfig.projectName + '/$2/$3"');

var buildCSS = lazypipe()
	.pipe(cssmin)
	.pipe(replace, /url\(\.\.\/([^)]+?)\)/gm, 'url('+buildConfig.basePath + buildConfig.projectName+'/$1)');

var buildJS = lazypipe()
	.pipe(uglify)
	.pipe(replace, /url:"([^"]+?)"/gm, 'url:"'+buildConfig.basePath+buildConfig.projectName+'/images/$1"')

gulp.task('useref', function(){
	return gulp.src('app/'+buildConfig.projectName+'/*.html')
		.pipe(useref())
		.pipe(gulpif('*.html', buildHTML()))
		.pipe(gulpif('*.css', buildCSS()))
		.pipe(gulpif('*.js', buildJS()))
		.pipe(gulp.dest('build/'+buildConfig.projectName))
})

gulp.task('copy-img', function(){
	return gulp.src('app/'+buildConfig.projectName+'/images/**/*.{png,jpg,jpeg,gif,mp4}')
		.pipe(gulp.dest('build/'+buildConfig.projectName+'/images'))
})

gulp.task('upload', function(){
	return gulp.src('build/'+buildConfig.projectName+'/**/*')
		.pipe(ftp({
			host: buildConfig.ftp.host,
			user: buildConfig.ftp.user,
			pass: buildConfig.ftp.pass,
			remotePath: buildConfig.ftp.remotePath+ '/' + buildConfig.projectName
		}))
		.pipe(gutil.noop())

})

gulp.task('clean-build', function(){
	return gulp.src('build/'+buildConfig.projectName, {read: false})
		.pipe(clean())
})

gulp.task('default', function(){
	runSequence(['sass:watch', 'server'])
})

gulp.task('build', function(){
	runSequence('clean-build', 'useref', 'copy-img', 'upload')
})

gulp.task('removeImgSrc', function(){
	return gulp.src('app/'+buildConfig.projectName+'/index.html')
		.pipe(cheerio({
			run:function($, file, done){
				var imgs = $('img');
				imgs.each(function(ix, img){
					var obj = path.parse($(img).attr('src'))
					if(obj.dir === 'images'){
						$(img)
							.attr('src-fix', obj.base.replace('.', '_'))
							.attr('src', 'http://edm.mcake.com/weifengwang/common/no.jpg')
					}
				})
				done();
			},
			parserOptions:{
				decodeEntities: false
			}})).pipe(gulp.dest('app/'+buildConfig.projectName))
})
gulp.task('addImgSrc', function(){
	gulp.src('app/'+buildConfig.projectName+'/index.html')
		.pipe(cheerio({
			run:function($, file, done){
				var imgs = $('img');
				imgs.each(function(ix, img){
					var dataSrc = $(img).attr('src-fix');
					if(dataSrc){
						$(img).attr('src', 'images/'+dataSrc.replace(/_(jpg|png|gif)$/,'.$1'))
							.removeAttr('data-src');
					}
				})
				done();
			},
			parserOptions:{
				decodeEntities: false
			}
		})).pipe(gulp.dest('app/'+buildConfig.projectName))
})

function getIP(){
	var ip = 'localhost';
	for (var dev in ifaces) {
		ifaces[dev].every(function(details){
			if (details.family=='IPv4' && details.address!='127.0.0.1' && !details.internal) {
				ip = details.address;
				return false;
			}
			return true;
		});
	}
	return ip;
}