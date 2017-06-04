import path from 'path';
import webpack from 'webpack';
import DashboardPlugin from 'webpack-dashboard/plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';

const mainPath = path.resolve(__dirname, 'src', 'index.js');
const buildPath = path.resolve(__dirname, 'github-profiler');

const browsersync = new BrowserSyncPlugin({
	host: 'localhost',
	port: 3000,
	proxy: 'http://localhost:3100/'
}, {reload: false});

const config = {
	devtool: 'eval',
	entry: {
		app: [mainPath],
		vendor: ['preact']
	},
	output: {
		path: buildPath,
		filename: '[name].js',
		publicPath: '/github-profiler/'
	},

	resolve: {
		alias: {
			'react': 'preact-compat',
			'react-dom': 'preact-compat'
		},
		extensions: ['.js', '.jsx']
	},

	devServer: {
		hotOnly: true,
		inline: true,
		port: 3100,
		historyApiFallback: true
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				include: [path.resolve('src'), path.resolve('node_modules/preact-compat/src')],
				loader: 'babel-loader',
			},
			{test: /\.(png|woff|woff2|eot|ttf|svg|ico)$/, loader: 'url-loader?limit=100000'},
			{test: /\.scss$/, loaders: ExtractTextPlugin.extract('css-loader!sass-loader')}

		]

	},
	plugins: [
		new DashboardPlugin(),
		browsersync,
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin({
			filename: 'styles.css',
			disable: false,
			allChunks: true
		}),
	]
};

export default config;
