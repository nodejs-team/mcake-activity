var gulp = require('gulp'),
    tinypng = require('gulp-tinypng-compress'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    replace = require('gulp-replace'),
    runSequence = require('run-sequence'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-minify-css'),
    ftp = require( 'vinyl-ftp' ),
    gutil = require('gulp-util'),
    lazypipe = require('lazypipe'),
    gulpwatch = require('gulp-watch'),
    cheerio = require('gulp-cheerio'),
    path = require('path'),
	  imagemin = require('gulp-imagemin'),
	  pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    del = require('del'),
    fs = require('fs'),
    argv = require('yargs')
					.alias('n', 'name')
					.alias('i', 'img')
					.alias('u', 'upload')
					.alias('t', 'type')
        	.argv;


var buildConfig = require('./package.json').buildConfig;
var projectName = argv['name'] && typeof argv['name'] == 'string' ? argv['name'] : buildConfig.projectName;

/**
 * gulp tinypng --name projectName
 * gulp tinypng -n projectName
 * gulp tinypng --name projectName --img example.png
 */
gulp.task('tinypng', function () {
	var imageName = '';
	var src = '';
	if(argv.img){
		imageName = argv.img;	//获取图片名称
		if(/(\.png|\.jpg|\.jpeg)$/.test(imageName)){
			src = 'app/'+projectName+'/images/'+imageName;
		}
	} else {
		src = 'app/'+projectName+'/images/**/*.{png,jpg,jpeg}';	//默认images文件夹下全部图片
	}

	gulp.src(src)
		.pipe(tinypng({
			key: buildConfig.tinypngKey,
			log: true
		}))
		.pipe(gulp.dest('app/'+projectName+'/tinypng'));
});

gulp.task('imagemin', function(){
	gulp.src('app/'+projectName+'/images/**/*.{png,jpg,jpeg}')
		.pipe(cache(imagemin({
            progressive: true,
			use: [pngquant()]
		})))
		.pipe(gulp.dest('app/'+projectName+'/tinypng'));
});

/**
 * gulp server
 */
gulp.task('server', function() {
	gulp.src(buildConfig.server.path)
		.pipe(webserver({
			host: getIP(),
			directoryListing: {enable:true, path: buildConfig.server.path},
			livereload: true,
			open: '/'+ projectName +'/index.html',
			port: buildConfig.server.port || 8001
		}));
});

/**
 * gulp sass -n projectName
 */
gulp.task('sass', function(){
	gulp.src('app/'+projectName+'/styles/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('app/'+projectName+'/styles'))
});

/**
 * gulp sass:watch -n projectName
 */
gulp.task('sass:watch', function(){
	// return gulpwatch('app/styles/*.scss', function(vinyl){
	// 	console.log(vinyl.path)
	// })
	// 	.pipe(sass().on('error', sass.logError))
	// 	.pipe(gulp.dest('app/styles'));
	return gulp.watch('app/'+projectName+'/styles/*.scss', ['sass'])
});

/**
 * gulp develop -n projectName
 */
gulp.task('develop', function(){
	runSequence(['sass', 'sass:watch', 'server'])
})

/**
 * gulp build --name projectName
 */
gulp.task('build', function(){
    cleanBuild().then(buildUseref).then(copyImg).then(function(){
    	if(argv.upload){
    		runSequence(['upload'])
		}
	});
});

/**
 * gulp upload --name projectName
 * gulp upload -n projectName
 */
gulp.task('upload', function(){
    var conn = ftp.create( {
        host:     buildConfig.ftp.host,
        user:     buildConfig.ftp.user,
        password: buildConfig.ftp.pass,
        parallel: 10,
        log:      gutil.log
    } );
    return gulp.src('build/'+projectName+'/**/*')
        .pipe(conn.dest( buildConfig.ftp.remotePath + projectName ))

});

/**
 * gulp init -n projectName --pc
 * gulp init -n projectName --wap
 */
gulp.task('init', function(){
    var type = argv.type || 'wap';
    if( typeof type === 'boolean' ){
    	throw new Error('请指定项目类型');
		}
    if(!projectName || typeof projectName!='string'){
        throw new Error('项目名称错误')
    }
    fs.stat('app/'+projectName, function(err, stats){
        if(err){
            gulp.src('template/'+type+'/**/*')
                .pipe(gulp.dest('app/'+projectName));
        } else {
            throw new Error('项目已存在')
        }
    })
});

/**
 * gulp removeImgSrc --name projectName
 */
gulp.task('removeImgSrc', function(){
	return gulp.src('app/'+projectName+'/index.html')
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
				});
				done();
			},
			parserOptions:{
				decodeEntities: false
			}})).pipe(gulp.dest('app/'+projectName))
});

/**
 * gulp addImgSrc --name projectName
 */
gulp.task('addImgSrc', function(){
	gulp.src('app/'+projectName+'/index.html')
		.pipe(cheerio({
			run:function($, file, done){
				var imgs = $('img');
				imgs.each(function(ix, img){
					var dataSrc = $(img).attr('src-fix');
					if(dataSrc){
						$(img).attr('src', 'images/'+dataSrc.replace(/_(jpg|png|gif)$/,'.$1'))
							.removeAttr('data-src');
					}
				});
				done();
			},
			parserOptions:{
				decodeEntities: false
			}
		})).pipe(gulp.dest('app/'+projectName))
});

var buildHTML = lazypipe()
    .pipe(replace, /"(\.\/)?(images|css|js|scripts|styles)\/([^"]+?)"/gm, '"'+ buildConfig.basePath + projectName + '/$2/$3"');

var buildCSS = lazypipe()
    .pipe(cssmin)
    .pipe(replace, /url\(\.\.\/([^)]+?)\)/gm, 'url('+buildConfig.basePath + projectName+'/$1)');

var buildJS = lazypipe()
    .pipe(uglify)
    .pipe(replace, /url:"([^"]+?)"/gm, function(matched, url){
		if(!/http:\/\//.test(url)){
			url = buildConfig.basePath+projectName+'/images/'+url;
		}
		return 'url:"'+url+'"';
	});

var t = 'url:"'+buildConfig.basePath+projectName+'/images/$1"';
function buildUseref(){
    return new Promise(function(resolve, reject){
        gulp.src('app/'+projectName+'/*.html')
            .pipe(useref())
            .pipe(gulpif('*.html', buildHTML()))
            .pipe(gulpif('*.css', buildCSS()))
            .pipe(gulpif('*.js', buildJS()))
            .pipe(gulp.dest('build/'+projectName))
            .on('end', resolve)
    });
}

function copyImg(){
    return new Promise(function(resolve,reject){
    	var imageFolder = 'images';
    	fs.stat('app/'+projectName+'/tinypng', function(err, stats){
    		if(!err){
    			imageFolder = 'tinypng';
			}
			gulp.src('app/'+projectName+'/'+imageFolder+'/**/*.{png,jpg,jpeg}')
					.pipe(gulp.dest('build/'+projectName+'/images'))
					.on('end', resolve)
			});
    });
}

function cleanBuild(){
    return del(['build/'+projectName]);
}

function getIP(){
	var ip = 'localhost';
	var ifaces = require('os').networkInterfaces();
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