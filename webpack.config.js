var path = require('path');
var webpack = require('webpack');
var HtmlPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var stylesPath = [
    path.resolve(__dirname, '.', 'app', 'pages'),
    path.resolve(__dirname, '.', 'app', 'components')
];

var config = {
    cache: true,
    devtool: 'source-map',
    entry: {
        polyfills: './app/config/polyfills',
        vendor: './app/config/vendor',
        main: './app/app.module',
        styles: './app/scss/style.scss'
    },
    output: {
        path: path.join(__dirname, 'docs'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'awesome-typescript-loader' },
            { test: /\.pug/, loader: 'pug-loader' },
            {
                test: /\.scss$/,
                include: stylesPath,
                loaders: ['raw-loader', 'sass-loader']
            },
            {
                test: /\.scss$/,
                exclude: stylesPath,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!resolve-url!sass-loader?sourceMap')
            },
            { test: /\.woff$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.woff2$/, loader: "url-loader?limit=10000&mimetype=application/font-woff2" },
            { test: /\.(eot|ttf|svg|gif|png)$/, loader: "file-loader" }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['polyfills', 'vendor', 'main'].reverse(),
            minChunks: Infinity
        }),
        new HtmlPlugin({
            title: 'Weather application',
            chunks: ['polyfills', 'vendor', 'main'],
            filename: 'index.html',
            template: './app/index.pug'
        }),
        new ExtractTextPlugin('bundle.css', {
            allChunks: true
        })
    ],
    resolve: {
        extensions: ['', '.ts', '.js', '.json'],
        modulesDirectories: ['node_modules']
    },
    devServer: {
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 },
    }
};
module.exports = config;