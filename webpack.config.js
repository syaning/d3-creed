var webpack = require('webpack');

module.exports = {
    entry: {
        'creed': './index.js',
        'creed.min': './index.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        library: 'creed',
        libraryTarget: 'umd'
    },
    watch: true,
    externals: {
        d3: true
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ]
};
