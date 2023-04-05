const DuplicatePackageCheckerPlugin = require("@cerner/duplicate-package-checker-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();


module.exports = {
	// モード値を production に設定すると最適化された状態で、
	// development に設定するとソースマップ有効でJSファイルが出力される
	// メインのJS
	//entry: './src/js/main.js',
	entry: {
		custom: './src/js/custom.js',
		'dev_custom': './src/js/dev_custom.js',
		//	viewport: './src/js/viewport.js'
	},
	// 出力ファイル
	output: {
		filename: '[name].js',
	},
	target: ["web", "es5"],
	mode: (process.env.MODEDEV == 'true') ? 'development' : 'production',
	devtool: (process.env.MODEDEV == 'true') ? 'source-map' : false,
	optimization: {
		minimize: (process.env.MODEDEV == 'true') ? false : true,
		minimizer: [new TerserPlugin()],
	},
	externals: {
		jquery: 'jQuery'
	},
	module: {
		rules: [{
			test: /\.js$/,
			// ローダーの処理対象から外すディレクトリ
			exclude: /node_modules/,
			// Babel を利用する
			loader: "babel-loader",
			// Babel のオプションを指定する
			options: {
				presets: [
					// プリセットを指定することで、ES2019 を ES5 に変換
					"@babel/preset-env"
				]
			}
		},],
	},
	resolve: {
		extensions: ['.js'],
		modules: [
			"node_modules"
		],
		alias: {
			//	vue$: "vue/dist/vue.esm.js"
		},
	},
	plugins: [
		new DuplicatePackageCheckerPlugin(), // ライブラリ間で依存しているモジュールが重複している場合、二重に読み込まないようにする
		new webpack.ProvidePlugin({
			jQuery: "jquery",
			$: "jquery",
			jquery: "jquery"
		})
	],
}