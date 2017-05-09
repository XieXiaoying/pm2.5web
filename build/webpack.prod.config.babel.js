import config from './webpack.base.config';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {changeStyleLoader} from './util';

config.output.filename = '[name].[chunkhash].js';
config.output.chunkFilename = '[id].[chunkhash].js';
config.devtool = false;

// config.module.loaders = config.module.loaders.map(config => {
//     if (!config.loader.includes('style')) {
//         return config;
//     }
//     config.loader = changeStyleLoader(config.loader);
//     return config;
// });

config.module.loaders = config.module.loaders.map(config => {
    if (!config.loader.includes('style')) {
        return config;
    }
    config.loader = changeStyleLoader(config.loader, 1);
    return config;
});

config.plugins = (config.plugins || []).concat([
    new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('../dist/static/manifest.json')
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
        filename: '../index.html',
        template: 'src/index.html',
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
        }
    })
])

export default config;
