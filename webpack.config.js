const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        open: true,
        static: ['dist']
    },
    devtool: 'eval-source-map', // enable: generate source maps
    plugins: [
        new ESLintPlugin(),
        new CleanWebpackPlugin({
            verbose: true // optional
        }),
        new HtmlWebpackPlugin({
            title: 'Exchange',
            template: './src/index.html',
            inject: 'body'
        }),
        new DotenvWebpackPlugin()
    ],
    module: {
        rules: [
            { 
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(gif|png|avif|jpe?g)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/images/'
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    'html-loader'
                ]
            },
        ]
    }
};