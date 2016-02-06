/**
 * Created by Zashy on 1/1/2016.
 */

var webpack = require('webpack');
// node module for path functions
var path = require('path');
// autoprefixer adds browser prefixes to new CSS features, allows you to configure which versions of browsers are supported
var autoprefixer = require('autoprefixer');
// npm module that compiles the CSS (works like Sass, but more strict to true CSS)
var precss       = require('precss');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
	entry: [
		'webpack-dev-server/client?http://localhost:3000', // WebpackDevServer host and port
		'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
		APP_DIR + '/index.js'
	],
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js',
		publicPath: 'http://localhost:3000/dist/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		// sets up the fetch polyfill
		new webpack.ProvidePlugin({
			'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
		})
	],
	module : {
		loaders : [
			// compiles javascript
			{
				test : /\.jsx?$/,
				include : APP_DIR,
				loaders : ['react-hot', 'babel']
			},
			// comiles CSS
			{
				test:   /\.s?css$/,
				loader: "style-loader!css-loader!postcss-loader"
			}
		]
	},
	// configured postcss
	postcss: function () {
		return [precss, autoprefixer];
	}
};

module.exports = config;