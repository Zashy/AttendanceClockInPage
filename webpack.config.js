/**
 * Created by Zashy on 1/1/2016.
 */

var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
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
		new webpack.ProvidePlugin({
			'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
		})
	],
	module : {
		loaders : [
			{
				test : /\.jsx?$/,
				include : APP_DIR,
				loaders : ['react-hot', 'babel']
			},
			{
				test:   /\.s?css$/,
				loader: "style-loader!css-loader!postcss-loader"
			}
		]
	},
	postcss: function () {
		return [precss, autoprefixer];
	}
};

module.exports = config;