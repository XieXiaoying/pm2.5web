/**
* @file webpack外部包配置
* 8.8, 2016
*/

const webpack = require('webpack');
const path = require('path');

const vendors = [
    'connect-history-api-fallback',
    'dropzone',
    'history',
    'isomorphic-fetch',
    'moment',
    'react-bootstrap',
    'react-bootstrap-table',
    'react-datepicker',
    'react-dnd',
    'react-dnd-html5-backend',
    'react-dropzone-component',
    'react-select',
    'react-toggle',
    'redux-react-local',
    'react-dnd-test-backend'
];

module.exports = {
    output: {
        path: path.resolve(__dirname, '../dist/static'),
        publicPath: '/static/',
        filename: '[name].plugins.js',
        library: '[name]'
    },
    entry: {
        'lib': vendors
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, '../dist/static', 'manifest.json'),
            name: '[name]',
            context: __dirname
        })
    ]
};
