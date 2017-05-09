/**
 * @file 抽取一下简单的工具函数
 *
 * @author 
 * Mar 30, 2016
 */
import ExtractTextPlugin from 'extract-text-webpack-plugin';
export function changeStyleLoader(loader, isSourceMap) {
    loader = loader.split('!');
    loader.shift();
    loader = loader.map(loader => {
        return loader + '-loader' + (isSourceMap ? '?sourceMap' : '');
    }).join('!');

    return ExtractTextPlugin.extract('style-loader', loader);
};