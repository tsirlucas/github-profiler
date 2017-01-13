const webpack = require('webpack');
const path = require('path');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const buildPath = path.resolve(__dirname, 'dist', 'build');
const mainPath = path.resolve(__dirname, 'src', 'app', 'main.jsx');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    devtool: 'eval',
    entry: [
        'materialize-loader!./materialize.config.js',
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        mainPath
    ],
    output: {
        path: buildPath,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['react-hot-loader/babel']
                }
            },
            {test: /\.(png|woff|woff2|eot|ttf|svg|ico)$/, loader: 'url-loader?limit=100000'},
            {test: /\.scss$/, loaders: ExtractTextPlugin.extract('css-loader!sass-loader')}

        ]

    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: 'styles.css',
            disable: false,
            allChunks: true
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery'
        })
    ]
};

module.exports = config;