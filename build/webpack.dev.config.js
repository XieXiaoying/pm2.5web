import config from './webpack.base.config';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {changeStyleLoader} from './util';

config.devtool = 'eval-source-map'

const hotClient = 'webpack-hot-middleware/client?noInfo=true&reload=true'
Object.keys(config.entry).forEach(name => {
    const extras = [hotClient];
    config.entry[name] = extras.concat(config.entry[name])
});

config.module.loaders = config.module.loaders.map(config => {
    if (!config.loader.includes('style')) {
        return config;
    }
    config.loader = changeStyleLoader(config.loader, 1);
    return config;
});

// necessary for the html plugin to work properly
// when serving the html from in-memory
config.output.publicPath = '/'

config.plugins = (config.plugins || []).concat([
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'testtest'
    })
]);

export default config;
