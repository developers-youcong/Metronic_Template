var gulp = require('gulp');
var yargs = require('yargs');
var sequence = require('run-sequence');
var build = require('./build');
var func = require('./helpers');
var rename = require('gulp-rename');
var rtlcss = require('gulp-rtlcss');
var glob = require('glob');
var fs = require('fs');
var sass = require('gulp-sass');

// merge with default parameters
var args = Object.assign({'prod': false, 'rtl': '', 'metronic': false, 'keen': false}, yargs.argv);

if (args.prod !== false) {
	// force disable debug for production
	build.config.debug = false;
	build.config.compile = Object.assign(build.config.compile, {
		'jsUglify': true,
		'cssMinify': true,
		'jsSourcemaps': false,
		'cssSourcemaps': false,
	});
}

if (args.rtl !== '') {
	build.config.compile.rtl.enabled = args.rtl;
}

gulp.task('rtl', function(cb) {
	var stream = null;
	func.objectWalkRecursive(build.build, function(val, key, userdata) {
		if (userdata.indexOf(key) === -1 && typeof val.styles !== 'undefined' && key !== 'bundle') {
			// rtl conversion in each plugins
			for (var i in val.styles) {
				if (!val.styles.hasOwnProperty(i)) {
					continue;
				}
				var toRtlFile = func.dotPath(val.styles[i]);

				// exclude scss file for now
				if (toRtlFile.indexOf('.scss') === -1) {
					stream = gulp.src(toRtlFile).pipe(rtlcss()).pipe(rename({
						suffix: '.rtl',
					})).pipe(gulp.dest(func.pathOnly(toRtlFile)));
				}
			}
		}
	}, build.config.compile.rtl.skip);
	return stream;
});

// task to bundle js/css
gulp.task('build-bundle', function(cb) {
	// build by demo, leave demo empty to generate all demos
	if (build.config.demo !== '') {
		for (var demo in build.build.demo) {
			if (!build.build.demo.hasOwnProperty(demo)) {
				continue;
			}
			if (build.config.demo !== demo) {
				delete build.build.demo[demo];
			}
		}
	}

	func.objectWalkRecursive(build.build, function(val, key) {
		if (val.hasOwnProperty('src')) {
			if (val.hasOwnProperty('bundle')) {
				func.bundle(val);
			}
			if (val.hasOwnProperty('output')) {
				func.output(val);
			}
		}
	});

	cb();
});

var tasks = ['clean'];
if ((/true/i).test(build.config.compile.rtl.enabled)) {
	tasks.push('rtl');
}

// entry point
gulp.task('default', tasks, function(cb) {
	// clean first and then start bundling
	return sequence(['build-bundle'], cb);
});

// scss compiler
gulp.task('classic-css', function(cb) {
	for (var demo in build.build.demo) {
		if (!build.build.demo.hasOwnProperty(demo)) {
			continue;
		}
		var obj = build.build.demo[demo].base;
		if (typeof obj.src.styles !== 'undefined' && obj.src.styles[0].indexOf('.scss') !== -1 && obj.hasOwnProperty('bundle')) {
			gulp.src(obj.src.styles).pipe(func.cssChannel()()).pipe(gulp.dest('../'));
		}
	}
	cb();
});