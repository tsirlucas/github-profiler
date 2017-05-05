const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const mainPath = path.resolve(__dirname, 'src', 'app', 'main.jsx');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//NODE_ENV=production webpack -p --config webpack.production.config.js

const config = {
    entry: {
        app: ['materialize-loader!./materialize.config.js', mainPath],
        vendor: ['preact']
    },
    output: {
        path: buildPath,
        filename: '[name].js',
        publicPath: '/build'
    },

    resolve: {
        alias: {
            react: 'preact-compat',
            'react-dom': 'preact-compat',
            // Not necessary unless you consume a module using `createClass`
            'create-react-class': 'preact-compat/lib/create-react-class'
        },
        extensions: ['.js', '.jsx']
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
            { test: /\.(png|woff|woff2|eot|ttf|svg|ico)$/, loader: 'url-loader?limit=100000' },
            { test: /\.scss$/, loaders: ExtractTextPlugin.extract('css-loader!sass-loader') }

        ]

    },
    plugins: [
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
