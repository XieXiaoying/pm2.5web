/**
 * @file dev server
 *
 * @author 
 * Mar 29, 2016
 */

import Express from 'express';
import path from 'path';
import httpProxy from 'http-proxy';
import http from 'http';
import url from 'url';
import fs from 'fs';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import config from './build/webpack.dev.config';
import connectHistoryApiFallback from 'connect-history-api-fallback';

console.log('Starting server...\n');

const proxy = httpProxy.createProxyServer();

const app = new Express();
const compiler = webpack(config);

// TODO迁移组件化的时候这块需要改
app.use(Express.static(path.join(__dirname)));
app.use(connectHistoryApiFallback());
app.use(webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
}));
app.use(webpackHotMiddleware(compiler));

// TODO这块后续根据mock map来负责转发，差一个mockApiMiddleware
function apiMiddleware(req, res, next) {
    return next();
    // TODO下面这块负责转发真正的API请求
    // return proxy.web(req, res, {
    //     target: 'http://cp01-sys-ra09-jueheng2qa049.cp01.baidu.com:8001'
    // });
}
app.use(apiMiddleware);

app.listen(3000, (req, res) => {
    console.log('Server started');
    console.log('Listening at localhost:3000');
});
