import webpack from 'webpack';
import path from 'path';
import glob from 'glob';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import SWPrecache from 'sw-precache-webpack-plugin';
import PurifyCSSPlugin from 'purifycss-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const buildPath = path.resolve(__dirname, 'github-profiler');
const mainPath = path.resolve(__dirname, 'src', 'main.js');

const config = {
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
                include: [path.resolve('src'), path.resolve('node_modules/preact-compat/src')],
                loader: 'babel-loader',
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg|ico)$/, loader: 'url-loader?limit=100000' },
            { test: /\.scss$/, loaders: ExtractTextPlugin.extract('css-loader!sass-loader') }

        ]

    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: 0
            },
            sourceMap: false,
            compress: {
                unused: 1,
                warnings: 0,
                comparisons: 1,
                conditionals: 1,
                negate_iife: 0, // <- for `LazyParseWebpackPlugin()`
                dead_code: 1,
                if_return: 1,
                join_vars: 1,
                evaluate: 1
            }
        }),
        new ExtractTextPlugin({
            filename: 'styles.css',
            disable: false,
            allChunks: true
        }),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'github-profiler/*.**')),
            moduleExtensions: ['.html', '.js'],
            verbose: true,
            purifyOptions: {
                minify: true
            }
        }),
        new HtmlWebpackPlugin({
            template: 'prod-index.html',
            filename: 'index.html',
            inject: false,
            excludeChunks: ['admin']
        }),
        new CopyWebpackPlugin([
            {from: 'assets', to: 'assets'},
            {from: 'manifest.json', to: '.'}
            // {from: 'CNAME', to: '.'}
        ]),
        new SWPrecache({
            cacheId: 'githubprofiler',
            minify: true,
            skipWaiting: true,
            filepath: 'github-profiler/service-worker.js',
            navigateFallback: 'index.html',
            staticFileGlobsIgnorePatterns: [/\.map$/, /\.DS_Store/],
            mergeStaticsConfig: false,
            runtimeCaching: [
                {
                    urlPattern: '/',
                    handler: 'cacheFirst',
                }
            ]
        })
    ]
};

module.exports = config;
