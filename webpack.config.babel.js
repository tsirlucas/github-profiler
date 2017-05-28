import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';

const buildPath = path.resolve(__dirname, 'github-profiler');
const mainPath = path.resolve(__dirname, 'src', 'main.js');

const browsersync = new BrowserSyncPlugin({
    host: 'localhost',
    port: 3000,
    proxy: 'http://localhost:3100/'
}, {reload: false});

const config = {
    devtool: 'eval',
    entry: {
        app: ['materialize-loader!./materialize.config.js', mainPath],
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
