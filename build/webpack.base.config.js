/**
 * @file webpack基础配置
 *
 * @author 
 * Mar 30, 2016
 */
import path from 'path';
import eslintFriendlyFormatter from 'eslint-friendly-formatter';
import postcssImport from 'postcss-import';
import postcssSimpleVars from 'postcss-simple-vars';
import postcssFocus from 'postcss-focus';
import autoprefixer from 'autoprefixer';
import postcssReporter from 'postcss-reporter';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
    entry: {
        main: 'app.jsx'
    },
    output: {
        path: path.resolve(__dirname, '../dist/static'),
        publicPath: '/static/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: [
            path.join(__dirname, '../src')
        ]
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel!eslint',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'style!css!postcss'
        }, {
            test: /\.styl$/,
            loader: 'style!css!postcss!stylus'
        }, {
            test: /\.(png|jpe?g|gif|svg)$/i,
            loader: 'url',
            query: {
                limit: 10000,
                name: '[name].[hash].[ext]'
            }
        }]
    },
    eslint: {
        configFile: '.eslintrc',
        formatter: eslintFriendlyFormatter
    },
    plugins: [
        new ExtractTextPlugin('[name].[contenthash].css')
    ],
    postcss() {
        return [
            postcssImport({
                glob: true,
                onImport: files => {
                    // add dependecies from the main.css files to the other css files...
                    // so they get hot–reloaded when something changes...
                    files.forEach(this.addDependency);
                }
            }),
            // ...then replace the variables...
            postcssSimpleVars(),
            // ...add a :focus to ever :hover...
            postcssFocus(),
            // ...and add vendor prefixes...
            autoprefixer({
                // ...supporting the last 2 major browser versions and IE 8 and up...
                browsers: ['last 2 versions', 'IE > 8']
            }),
            // This plugin makes sure we get warnings in the console
            postcssReporter({
                clearMessages: true
            })
        ];
    }
};
