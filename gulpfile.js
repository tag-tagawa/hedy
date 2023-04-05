/*!
 * Gulp settings dartsass fix
 * v 20221024
 *
 * Date: 2022-10-24T16:36Z
 */

'use strict';

require('dotenv').config();

const paths = {
	site: {
		url: process.env.LOCAL_URL,
	},
	globalstyles: {
		src: './src/scss/style/**/**/*.scss',
		dest: './item/css/',
		csssrc: './item/css/**/**/*.css',
		notcsssrc: '!_assets/css/**/*.min.css'
	},
	scripts: {
		src: './src/js/**/*.{js,jsx}',
		dest: './item/js/',
		notjsmin: '!./item/js/**/*.min.js'
	},
	bulid_scripts: {
		src: ['./src/js/**/*.js'],
		dest: './item/js/',
	},
	map: {
		path: './item/**/**/*.map',
	}
};

const {
	src,
	dest,
	watch,
	lastRun,
	series,
	parallel
} = require('gulp');

const browserSync = require('browser-sync');

const sass = require('gulp-sass')(require('sass'));

const sassglob = require('gulp-sass-glob-use-forward')

//const fibers = require('fibers');

const csso = require('gulp-csso');

const notify = require('gulp-notify');

const rename = require('gulp-rename');

const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');

const uglify = require('gulp-uglify-es').default;

const postcss = require('gulp-postcss');

const sortMediaQueries = require('postcss-sort-media-queries');

const cssdeclsort = require('css-declaration-sorter');

const beautify = require('gulp-beautify');

const ejs = require('gulp-ejs');

const replace = require('gulp-replace');

const cached = require('gulp-cached');

const dependents = require('gulp-dependents');

const dependentsConfig = {
	".scss": {
		parserSteps: [
			/(?:^|;|{|}|\*\/)\s*@(import|use|forward|include)\s+((?:"[^"]+"|'[^']+'|url\((?:"[^"]+"|'[^']+'|[^)]+)\)|meta\.load\-css\((?:"[^"]+"|'[^']+'|[^)]+)\))(?:\s*,\s*(?:"[^"]+"|'[^']+'|url\((?:"[^"]+"|'[^']+'|[^)]+)\)|meta\.load\-css\((?:"[^"]+"|'[^']+'|[^)]+)\)))*)(?=[^;]*;)/gm,
			/"([^"]+)"|'([^']+)'|url\((?:"([^"]+)"|'([^']+)'|([^)]+))\)|meta\.load\-css\((?:"([^"]+)"|'([^']+)'|([^)]+))\)/gm
		],
		prefixes: ["_"],
		postfixes: [".scss", ".sass"],
		basePaths: []
	}
};

const data = require('gulp-data');

const assets = require('postcss-assets');

const wait = require('gulp-wait');

const filter = require('gulp-filter');

const webpack = require('webpack'); // Let's use webpack.DefinePlugin
const webpackStream = require('webpack-stream'); // Let's use webpack3
const webpackConfig = require('./webpack.config.js'); // webpack config

// sass config
const sassconfig = {
	setting: {
		//fiber: fibers,
		includePaths: ['node_modules', 'src/scss/style'],
		outputStyle: (process.env.MODEDEV == 'true') ? 'expanded' : 'expanded',
		precision: 10, //計算時に小数点10桁まで出力
		sourceComments: false,
		unixNewlines: false,
		indentType: 'tab',
		indentWidth: 1
	}
}

// auto prefixer config
const autoprefixer_config = {
	grid: true,
	cascade: false,
}

// html beauty config
const htmlbeauty_config = {
	indent_size: 1,
	indent_with_tabs: true,
	preserve_newlines: false,
	max_preserve_newlines: 0,
	extra_liners: '',
	unformatted: ['script']
}

const fs = require('fs');

const findRemoveSync = require('find-remove')
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');

/**
 * browser_sync
 */
const browser_sync = (cb) => {

	if (process.env.MODE_LOCAL_URL == 'true') {

		browserSync({
			https: {
				key: 'D:\\local-ssl\\localhost\\localhost.key',
				cert: 'D:\\local-ssl\\localhost\\localhost.crt'
			},
			files: ['./**/*.php', './**/*.html'],
			ghostMode: false,
			open: false,
			browser: ['chrome'],
			hostMode: true,
			port: 3000,
			reloadDelay: 100,
			injectChanges: false,
			proxy: {
				target: paths.site.url
			}
		})

	} else {

		browserSync({
			files: ['./**/*.php', './**/*.html'],
			ghostMode: false,
			open: false,
			browser: ['chrome'],
			hostMode: true,
			port: 3000,
			reloadDelay: 100,
			injectChanges: false,
			server: {
				baseDir: './',
				routes: {
					'/': 'dist'
				}
			},
			files: './',
			startPath: '/',
			online: true
		})
	}

	cb();

}

/**
 * global_sass_compile
 */
const global_sass_compile = (cb) => {

	return src(paths.globalstyles.src, {
		//	sourcemaps: (process.env.MODEDEV == 'true') ? true : false,
		//since: lastRun(global_sass_compile)
	})
		.pipe(plumber({
			errorHandler: notify.onError("Error: <%= error.message %>")
		}))
		.pipe(sassglob())
		.pipe(cached('scss')) // 1
		.pipe(dependents(dependentsConfig)) // find sass files to re-compile
		.pipe(sassglob())
		.pipe(wait(300))
		//	.pipe(gulpif(process.env.MODEDEV == 'true', sourcemaps.init()))
		.pipe(sass.sync(sassconfig.setting).on('error', sass.logError))
		.pipe(autoprefixer(autoprefixer_config))
		.pipe(postcss([
			assets({
				loadPaths: ['src/icons'],
			}),
			cssdeclsort({
				order: 'smacss',
				keepOverrides: true
			}),
			sortMediaQueries({
				sort: 'desktop-first'
			})
		]))
		//	.pipe(gulpif(process.env.MODEDEV == 'true', sourcemaps.write('./')))
		.pipe(dest(paths.globalstyles.dest))
		//.pipe(browserSync.stream())
		.pipe(csso({
			//	restructure: false,
			sourceMap: false,
			debug: false
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(filter('**/*.css'))
		.pipe(dest(paths.globalstyles.dest));
	cb();

}

/**
 * assets_sass_compile
 */
const assets_sass_compile = (cb) => {

	return src(paths.assetstyles.src, {
		//	sourcemaps: (process.env.MODEDEV == 'true') ? true : false,
		//since: lastRun(assets_sass_compile)
	})
		.pipe(plumber({
			errorHandler: notify.onError("Error: <%= error.message %>")
		}))
		.pipe(sassglob())
		.pipe(cached('assetscss')) // 1
		.pipe(dependents(dependentsConfig)) // find sass files to re-compile
		.pipe(sassglob())
		.pipe(wait(300))
		.pipe(gulpif(process.env.MODEDEV == 'true', sourcemaps.init()))
		.pipe(sass(sassconfig.setting).on('error', sass.logError))
		.pipe(autoprefixer(autoprefixer_config))
		.pipe(postcss([
			assets({
				loadPaths: ['src/icons'],
			}),
			cssdeclsort({
				order: 'smacss',
				keepOverrides: true
			}),
			sortMediaQueries({
				sort: 'desktop-first'
			})
		]))
		.pipe(gulpif(process.env.MODEDEV == 'true', sourcemaps.write('./')))
		.pipe(dest(paths.assetstyles.dest))
		//.pipe(browserSync.stream())
		.pipe(csso({
			//	restructure: false,
			sourceMap: false,
			debug: false
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(filter('**/*.css'))
		.pipe(dest(paths.assetstyles.dest));
	cb();
}

/**
 * js_minify
 */
const js_minify = (cb) => {

	return src([paths.scripts.src, paths.scripts.notjsmin], {
		since: lastRun(js_minify)
	})
		.pipe(plumber({
			errorHandler: notify.onError("Error: <%= error.message %>")
		}))
		.pipe(dest(paths.scripts.dest))
		.pipe(uglify({
			output: {
				comments: false
			}
		}))
		//.pipe(ngannotate())
		.pipe(rename({
			extname: '.min.js'
		}))
		.pipe(dest(paths.scripts.dest));
	cb();
}

/**
 * js_bulid
 */
const js_bulid = (cb) => {
	return src([paths.scripts.src, paths.scripts.notjsmin], {
		//since: lastRun(js_minify)
	})
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(webpackStream(webpackConfig, webpack))
		.pipe(dest(paths.scripts.dest))
		.pipe(browserSync.stream());
	cb();
}


// remove cleanmap
const cleanmap = (cb) => {

	const result = findRemoveSync('./item', {
		extensions: ['.map']
	})

	if (result) {
		console.log(result);
	}
	cb();
};

// global_scss_watcher
const global_scss_watcher = watch([paths.globalstyles.src], series(global_sass_compile));

global_scss_watcher.on('change', function (path, stats) {
	console.log('File ' + path + ' was , scss running tasks...');
});


if (process.env.JSBULID == 'true') {

	// js_bulid_watcher
	const js_bulid_watcher = watch(paths.bulid_scripts.src, series(js_bulid));

	js_bulid_watcher.on('change', function (path, stats) {
		console.log('File ' + path + ' was, js bulid running tasks...');
	});

} else {

	// js_watcher
	const js_watcher = watch([paths.scripts.src], series(js_minify));

	js_watcher.on('change', function (path, stats) {
		console.log('File ' + path + ' was, js running tasks...');
	});

}

/**
 * exports
 */
exports.default = parallel(browser_sync);

exports.cleanmap = cleanmap;