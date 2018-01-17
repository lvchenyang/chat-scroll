/**
 * Created by lvcy on 17-12-29.
 */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = path.resolve('example');
module.exports = {
    target: 'web',
    entry: {
        main: path.resolve(base, 'index')
    },
    output: {
        path: path.resolve(base, 'dist'),
        filename: "app.min.js"
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use : ['babel-loader']
        }]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: path.resolve(base, 'index.html')
        // }),
        // new webpack.optimize.UglifyJsPlugin({
        //     output  : {comments: false},
        //     compress: {warnings: false}
        // })
    ],
    devServer: {
        contentBase: path.resolve(base, 'dist'),
        compress: false,
        port: 9001,
        host: '10.14.143.19',
        hot : true,
        inline: true,
        watchOptions: {
            poll: 1000,
            aggregateTimeout: 300
        }
    }
};